import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, IconButton } from '@mui/material'
import SortIcon from '@mui/icons-material/Sort';
import { Collapse } from '@mui/material';

export default function Header() {

    const myStyle = {
        background: 'none'
    };
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(true)
    }, [])

    return (
        <>
            <div className='headerroot'>
                <AppBar style={myStyle} elevation={0}>
                    <Toolbar style={{ width: '80%', margin: '0 auto', paddingTop: '10px' }}>
                        <h1 className='name'>WACI</h1>
                        <IconButton>
                            <SortIcon style={{ fontSize: '3rem', color: '#0a41f7' }} />
                        </IconButton>
                    </Toolbar>

                </AppBar>
                <Collapse in={checked}  {...(checked ? { timeout: 1000 } : {})} >
                    <div className='txt'>
                        <h1 className='title'>Welcome To <br /> World Answers Church International</h1>
                    </div>
                </Collapse >

            </div>
            <div className='btn'>
               <button onClick={()=>console.log('yoo')} className='lgn'>LOGIN</button>
            </div>
        </>
    )
}
