import React, { createContext } from "react";
import { INote } from "./types";

export const LoginContext = createContext(
   {} as {
        authorName: string ;
        setAuthorName: React.Dispatch<React.SetStateAction<string>>;

   }
    );
    export const NotesContext = createContext(
        {} as {
             allNotes: INote[] ;
             setAllNotes: React.Dispatch<React.SetStateAction<INote[]>>;
             reloadNotes : boolean;
             setReloadNotes:React.Dispatch<React.SetStateAction<boolean>>;
             
     
        }
         );