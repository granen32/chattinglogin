import * as admin from "firebase-admin";

interface Config {
  credential: {
    privateKey: string;
    clientEmail: string;
    projectId: string;
  };
}

export default class FirebaseAdmin {
  public static insstance: FirebaseAdmin;
  private init = false;

  public static getInstance(): FirebaseAdmin {
    if (
      FirebaseAdmin.insstance === undefined ||
      FirebaseAdmin.insstance === null
    ) {
      FirebaseAdmin.insstance = new FirebaseAdmin();
    }
    return FirebaseAdmin.insstance;
  }
  private bootstrap(): void {
    const haveApp = admin.apps.length != 0;
    if (haveApp) {
      this.init = true;
      return;
    }

    const config: Config = {
      credential: {
        projectId: process.env.projectId || "",
        clientEmail: process.env.clientEmail || "",
        privateKey: (process.env.privateKey || "").replace(/\\n/g, "\n"),
      },
    };
    admin.initializeApp({
      credential: admin.credential.cert(config.credential),
    });
    console.info("bootstap firebase admin");
  }
  //   firebase 반환
  public get Firebase(): FirebaseFirestore.Firestore {
    if (this.init === false) {
      this.bootstrap();
    }
    return admin.firestore();
  }
  public get Auth(): admin.auth.Auth {
    if (this.init === false) {
      this.bootstrap();
    }
    return admin.auth();
  }
}
