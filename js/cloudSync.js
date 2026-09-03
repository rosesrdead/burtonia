/* ===================================
   BURTONIA - Cloud Sync
   Supabase + Magic Link authentication
=================================== */

let cloudClient = null;
let cloudUser = null;
let cloudReady = false;
let cloudSyncInProgress = false;

const CLOUD_TABLE =
    "burtonia_data";

const CLOUD_ROW_ID =
    "burtonia";


/* ===================================
   KONFIGURÁCIÓ
=================================== */

function cloudIsConfigured() {

    return Boolean(

        window.BURTONIA_CLOUD &&

        window.BURTONIA_CLOUD.enabled &&

        window.BURTONIA_CLOUD.supabaseUrl &&

        window.BURTONIA_CLOUD.supabaseAnonKey &&

        !window.BURTONIA_CLOUD.supabaseUrl.includes(
            "IDE_JON"
        ) &&

        !window.BURTONIA_CLOUD.supabaseAnonKey.includes(
            "IDE_JON"
        )

    );

}


/* ===================================
   ÁLLAPOTÜZENET
=================================== */

function setCloudStatus(
    text,
    state = ""
) {

    const element =
        document.getElementById(
            "cloudSyncStatus"
        );


    if (!element) {

        return;

    }


    element.textContent =
        text;


    element.dataset.state =
        state;

}


/* ===================================
   FELHŐ UI
=================================== */

function updateCloudUI() {

    const loginButton =
        document.getElementById(
            "cloudLoginButton"
        );


    const logoutButton =
        document.getElementById(
            "cloudLogoutButton"
        );


    const actions =
        document.getElementById(
            "cloudSyncActions"
        );


    const email =
        document.getElementById(
            "cloudEmail"
        );


    if (
        !loginButton ||
        !logoutButton ||
        !actions
    ) {

        return;

    }


    /* ===== NINCS BEÁLLÍTVA ===== */

    if (!cloudIsConfigured()) {

        loginButton.style.display =
            "block";

        logoutButton.style.display =
            "none";

        actions.style.display =
            "none";


        setCloudStatus(

            "A felhő még nincs beállítva. Ellenőrizd a js/config.js fájlt.",

            "error"

        );


        return;

    }


    /* ===== BETÖLTÉS ===== */

    if (!cloudReady) {

        loginButton.style.display =
            "block";

        logoutButton.style.display =
            "none";

        actions.style.display =
            "none";


        setCloudStatus(

            "☁️ Felhő inicializálása...",

            "loading"

        );


        return;

    }


    /* ===== BEJELENTKEZVE ===== */

    if (cloudUser) {

        loginButton.style.display =
            "none";

        logoutButton.style.display =
            "block";

        actions.style.display =
            "flex";


        if (email) {

            email.value =
                cloudUser.email || "";

        }


        setCloudStatus(

            `☁️ Bejelentkezve: ${
                cloudUser.email || "felhasználó"
            }`,

            "connected"

        );


        return;

    }


    /* ===== NINCS BEJELENTKEZVE ===== */

    loginButton.style.display =
        "block";

    logoutButton.style.display =
        "none";

    actions.style.display =
        "none";


    setCloudStatus(

        "Nincs bejelentkezve.",

        "offline"

    );

}


/* ===================================
   FELHŐ INICIALIZÁLÁSA
=================================== */

async function initCloudSync() {

    updateCloudUI();


    if (!cloudIsConfigured()) {

        return;

    }


    if (!window.supabase) {

        setCloudStatus(

            "A Supabase könyvtár nem töltődött be.",

            "error"

        );

        return;

    }


    try {

        cloudClient =
            window.supabase.createClient(

                window.BURTONIA_CLOUD.supabaseUrl,

                window.BURTONIA_CLOUD.supabaseAnonKey

            );


        /* ===================================
           AKTUÁLIS SESSION
        =================================== */

        const result =
            await cloudClient.auth.getSession();


        if (result.error) {

            throw result.error;

        }


        cloudUser =
            result.data.session
                ? result.data.session.user
                : null;


        cloudReady =
            true;


        updateCloudUI();


        /*
           Ha már eleve be volt jelentkezve,
           AZONNAL töltjük a felhőt.

           Ez volt az egyik hiányzó rész.
        */

        if (cloudUser) {

            const loaded =
                await pullCloudDB(false);


            if (
                loaded &&
                typeof render === "function"
            ) {

                render();

            }

        }


        /* ===================================
           AUTH VÁLTOZÁS FIGYELÉSE
        =================================== */

        cloudClient.auth.onAuthStateChange(

            (event, session) => {

                cloudUser =
                    session
                        ? session.user
                        : null;


                updateCloudUI();


                /*
                   Új bejelentkezés után
                   felhőből töltünk.
                */

                if (
                    cloudUser &&
                    event === "SIGNED_IN"
                ) {

                    setTimeout(

                        async () => {

                            const loaded =
                                await pullCloudDB(false);


                            if (
                                loaded &&
                                typeof render === "function"
                            ) {

                                render();

                            }

                        },

                        150

                    );

                }

            }

        );


    } catch (error) {

        console.error(
            "BURTONIA cloud init error:",
            error
        );


        cloudReady =
            false;


        updateCloudUI();


        setCloudStatus(

            "Nem sikerült kapcsolódni a felhőhöz.",

            "error"

        );

    }

}


/* ===================================
   BELÉPÉSI LINK
=================================== */

async function requestCloudLogin() {

    if (
        !cloudReady ||
        !cloudClient
    ) {

        alert(

            "A felhő még nem áll készen. Próbáld újra néhány másodperc múlva."

        );

        return;

    }


    const emailInput =
        document.getElementById(
            "cloudEmail"
        );


    const email =
        emailInput
            ? emailInput.value.trim()
            : "";


    if (!email) {

        alert(
            "Adj meg egy e-mail címet!"
        );

        return;

    }


    const redirectTo =
        window.location.origin +
        window.location.pathname;


    try {

        const loginButton =
            document.getElementById(
                "cloudLoginButton"
            );


        if (loginButton) {

            loginButton.disabled =
                true;

            loginButton.textContent =
                "✉️ Küldés...";

        }


        setCloudStatus(

            "✉️ Belépési link küldése...",

            "loading"

        );


        const result =
            await cloudClient.auth.signInWithOtp({

                email: email,

                options: {

                    emailRedirectTo:
                        redirectTo

                }

            });


        if (result.error) {

            throw result.error;

        }


        setCloudStatus(

            "✉️ Belépési link elküldve. Nézd meg az e-mailjeidet!",

            "connected"

        );


        alert(

            "A belépési linket elküldtem az e-mail címedre.\n\nNyisd meg az e-mailt, majd kattints a linkre."

        );


    } catch (error) {

        console.error(
            "BURTONIA login error:",
            error
        );


        setCloudStatus(

            "Nem sikerült elküldeni a belépési linket.",

            "error"

        );


        alert(

            "Nem sikerült elküldeni a belépési linket.\n\n" +
            error.message

        );


    } finally {

        const loginButton =
            document.getElementById(
                "cloudLoginButton"
            );


        if (loginButton) {

            loginButton.disabled =
                false;

            loginButton.textContent =
                "✉️ Belépési link küldése";

        }

    }

}


/* ===================================
   KIJELENTKEZÉS
=================================== */

async function logoutCloud() {

    if (!cloudClient) {

        return;

    }


    try {

        const result =
            await cloudClient.auth.signOut();


        if (result.error) {

            throw result.error;

        }


        cloudUser =
            null;


        updateCloudUI();


    } catch (error) {

        console.error(
            "BURTONIA logout error:",
            error
        );


        alert(

            "Nem sikerült kijelentkezni.\n\n" +
            error.message

        );

    }

}


/* ===================================
   HELYI ADATBÁZIS MÁSOLATA
=================================== */

function getLocalDBCopy() {

    if (
        typeof db === "undefined"
    ) {

        return null;

    }


    return JSON.parse(
        JSON.stringify(db)
    );

}


/* ===================================
   FELHŐBE MENTÉS
=================================== */

async function pushCloudDB(
    showMessage = false
) {

    if (
        !cloudUser ||
        !cloudClient
    ) {

        return false;

    }


    if (cloudSyncInProgress) {

        return false;

    }


    const localDB =
        getLocalDBCopy();


    if (!localDB) {

        return false;

    }


    cloudSyncInProgress =
        true;


    try {

        const payload = {

            id:
                CLOUD_ROW_ID,

            user_id:
                cloudUser.id,

            data:
                localDB,

            updated_at:
                new Date().toISOString()

        };


        const result =
            await cloudClient
                .from(CLOUD_TABLE)
                .upsert(

                    payload,

                    {
                        onConflict:
                            "user_id"
                    }

                );


        if (result.error) {

            throw result.error;

        }


        setCloudStatus(

            "☁️ Szinkronizálva",

            "connected"

        );


        if (showMessage) {

            alert(

                "☁️ A BURTONIA könyvtár sikeresen felkerült a felhőbe."

            );

        }


        return true;


    } catch (error) {

        console.error(
            "BURTONIA push error:",
            error
        );


        setCloudStatus(

            "A felhőbe mentés nem sikerült.",

            "error"

        );


        if (showMessage) {

            alert(

                "Nem sikerült a felhőbe menteni.\n\n" +
                error.message

            );

        }


        return false;


    } finally {

        cloudSyncInProgress =
            false;

    }

}


/* ===================================
   FELHŐBŐL BETÖLTÉS
=================================== */

async function pullCloudDB(
    showMessage = false
) {

    if (
        !cloudUser ||
        !cloudClient
    ) {

        return false;

    }


    if (cloudSyncInProgress) {

        return false;

    }


    cloudSyncInProgress =
        true;


    try {

        const result =
            await cloudClient
                .from(CLOUD_TABLE)
                .select(
                    "data, updated_at"
                )
                .eq(
                    "user_id",
                    cloudUser.id
                )
                .maybeSingle();


        if (result.error) {

            throw result.error;

        }


        /* ===================================
           NINCS FELHŐS ADAT
        =================================== */

        if (!result.data) {

            /*
               FONTOS:

               Nem töltünk fel automatikusan
               semmit.

               Így egy üres vagy új eszköz
               nem tudja véletlenül törölni
               a felhő tartalmát.
            */

            setCloudStatus(

                "☁️ Nincs még felhőben mentett könyvtár.",

                "connected"

            );


            return false;

        }


        /* ===================================
           FELHŐS ADAT ELLENŐRZÉSE
        =================================== */

        if (
            !result.data.data ||
            typeof result.data.data !== "object"
        ) {

            setCloudStatus(

                "A felhőben lévő adat hibás.",

                "error"

            );


            return false;

        }


        /* ===================================
           FELHŐ BETÖLTÉSE
        =================================== */

        db =
            result.data.data;


        if (!Array.isArray(db.lists)) {

            db.lists = [];

        }


        if (!Array.isArray(db.items)) {

            db.items = [];

        }


        /* ===== RÉGI LISTÁK ===== */

        db.lists.forEach(list => {

            if (!list.icon) {

                list.icon =
                    "📝";

            }

        });


        /* ===== HELYI MENTÉS ===== */

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(db)

        );


        /* ===================================
           DÁTUM
        =================================== */

        const date =
            result.data.updated_at

                ? new Date(
                    result.data.updated_at
                ).toLocaleString(
                    "hu-HU"
                )

                : "";


        setCloudStatus(

            "☁️ Felhő szinkronizálva" +

            (
                date
                    ? ` • ${date}`
                    : ""
            ),

            "connected"

        );


        if (showMessage) {

            alert(

                "☁️ A felhős BURTONIA könyvtár betöltve." +

                (
                    date
                        ? `\n\nUtolsó módosítás: ${date}`
                        : ""
                )

            );

        }


        return true;


    } catch (error) {

        console.error(
            "BURTONIA pull error:",
            error
        );


        setCloudStatus(

            "A felhőből betöltés nem sikerült.",

            "error"

        );


        if (showMessage) {

            alert(

                "Nem sikerült a felhőből betölteni.\n\n" +
                error.message

            );

        }


        return false;


    } finally {

        cloudSyncInProgress =
            false;

    }

}


/* ===================================
   AUTOMATIKUS SZINKRON
=================================== */

function syncDBToCloud() {

    if (!cloudUser) {

        return;

    }


    if (!cloudReady) {

        return;

    }


    /*
       Mentés a felhőbe.

       FONTOS:
       Csak akkor történik meg,
       ha a felhasználó már be van
       jelentkezve és a cloud kész.
    */

    pushCloudDB(false);

}


/* ===================================
   FELHŐ GOMBOK
=================================== */

function setupCloudButtons() {

    const loginButton =
        document.getElementById(
            "cloudLoginButton"
        );


    const logoutButton =
        document.getElementById(
            "cloudLogoutButton"
        );


    const uploadButton =
        document.getElementById(
            "cloudUploadButton"
        );


    const downloadButton =
        document.getElementById(
            "cloudDownloadButton"
        );


    /* ===== LOGIN ===== */

    if (loginButton) {

        loginButton.onclick =
            requestCloudLogin;

    }


    /* ===== LOGOUT ===== */

    if (logoutButton) {

        logoutButton.onclick =
            logoutCloud;

    }


    /* ===== FELTÖLTÉS ===== */

    if (uploadButton) {

        uploadButton.onclick =
            async () => {

                const confirmed =
                    confirm(

                        "A jelenlegi ezen az eszközön lévő BURTONIA könyvtár felülírja a felhőben lévő változatot.\n\nBiztosan folytatod?"

                    );


                if (!confirmed) {

                    return;

                }


                await pushCloudDB(true);

            };

    }


    /* ===== LETÖLTÉS ===== */

    if (downloadButton) {

        downloadButton.onclick =
            async () => {

                const confirmed =
                    confirm(

                        "A felhőből betöltött BURTONIA könyvtár felülírja ezen az eszköz jelenlegi könyvtárát.\n\nBiztosan folytatod?"

                    );


                if (!confirmed) {

                    return;

                }


                const success =
                    await pullCloudDB(true);


                if (
                    success &&
                    typeof render === "function"
                ) {

                    render();

                }

            };

    }


    updateCloudUI();

}


/* ===================================
   INDÍTÁS
=================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        setupCloudButtons();

    }

);
