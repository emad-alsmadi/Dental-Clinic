import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export const requiredUser =async() =>{
    const user =currentUser()
    if(!user) {
        redirect("/")
    }
}