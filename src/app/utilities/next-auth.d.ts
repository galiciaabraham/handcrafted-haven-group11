import NextAuth from "next-auth";


    export interface User {
        user_id: string;
        user_name: string;
        user_email: string;
    }

    export interface Session {
        user : User;
    }

    export interface JWT {
        user : User;
    }
