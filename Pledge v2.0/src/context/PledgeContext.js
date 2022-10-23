import React, { useState } from "react"
import { base_url } from "../components/Utils"

const PledgeContext = React.createContext()

export function usePledges() {
    return React.useContext(PledgeContext)
}


export const PledgeProvider = ({ children }) => {
    const [programs, setPrograms] = useState([])
    const [contributors, setContributors] = useState([])

    async function fetchPrograms() {
        try {
            const opts = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                }
            }
            const response = await fetch(base_url + 'get_programs', opts)
            const data = await response.json()
            setPrograms(data.programs)
            console.log(data)

        }
        catch {

        }
    }

    async function fetchContributors() {
        const opts = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        }
        const response = await fetch(base_url + 'get_contributors', opts)
        const data = await response.json()
        setContributors(data.contributors)
        console.log('contributors', data)


    }



    function getPledgeContributors(pledgename) {

        return contributors.filter(contributor => contributor.program === pledgename)
    }

    function getMinimumPayment(pledgename) {
        return programs.filter((p) => p.name === pledgename).reduce((a, b) => a + b.min_payment, 0)

    }

    async function addProgram(data) {
        const opts = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    }
        const response = await fetch(base_url + 'add_program', opts)
        const info = await response.json()
        console.log(info)
    }


    async function addProgramContributor(data) {
        const opts = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
        }
        const response = await fetch(base_url + '/add_contributor', opts)
        const json = await response.json()
        console.log(json)

    }

    function getTotalPledgePayments(pledgename) {
        //target is the object in the contributions array
        let target = programs.filter((pledge) => pledge.name === pledgename)
        // console.log(target[0].collected_amount)
        return target[0].collected

    }

    async function addPayment(data) {
        const opts = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
        }
        const response = await fetch(base_url + 'add_contributor_payment', opts)
        const info = await response.json()
        console.log(info)
    }

    async function AddUser(data) {
        const opts = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
        }

        const response = await fetch(base_url + 'add_user', opts)
        const info = await response.json()
        console.log(info)
    }
    return <PledgeContext.Provider value={{
        programs,
        contributors,
        getPledgeContributors,
        addProgram,
        addProgramContributor,
        getTotalPledgePayments,
        fetchPrograms,
        fetchContributors,
        setContributors,
        addPayment,
        getMinimumPayment,
        AddUser

    }} >{children}</PledgeContext.Provider>
}