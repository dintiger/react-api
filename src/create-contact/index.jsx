import axios from "axios";
import React from "react";

export function CreateContact(){
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")

    const [email, setEmail] = React.useState("")
    const [work, setWork] = React.useState("")
    const [mobile, setMobile] = React.useState("")

    async function addContact(){
        try{
            const tempContact = {
                firstName: firstName,
                lastName: lastName,
                email: [email],
                phoneNumbers: {
                    work: work,
                    mobile: mobile
                }
            }
            const response = await axios.post("https://malay-contact-list.onrender.com/api", tempContact)
            console.log(response.data)
        }catch (e) {
            console.log(e.response)
            console.log(e.response.data)
        }
    }
    return (
        <div>
            <div>
                <input name={"firstName"} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
                <input name={"lastName"} value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
                <input name={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <input name={"work"} value={work} onChange={(e) => setWork(e.target.value)} />
            </div>
            <div>
                <input name={"mobile"} value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </div>

            <button onClick={addContact}>Add Contact</button>
        </div>    )
}
