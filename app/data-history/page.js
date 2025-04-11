
'use client'
import * as React from 'react';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NavBar from '../components/nav-bar'
import Pagination  from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'
import axios from 'axios'
import moment from 'moment'



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#CBD5E166',
      color: '#282828',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   '&:nth-of-type(odd)': {
  //     backgroundColor: theme.palette.action.hover,
  //   },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function Home() {
    const [readings, setReadings] = useState([])
    const [param, setParam] = useState('temp')

    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(5)
    
    useEffect(()=>{

        getSensorData()
    },[])

    const getSensorData = async () => {
    await axios.get(`https://fishpondmonitoring.netlify.app/api/sensor-readings`).then(res => {
        // await axios.post(`http://localhost:3000/api/data-history`).then(res => {
            // console.log('response', res.data.data)
            // console.log(res.data)
            setReadings(res.data?.data)
            console.log(res.data)
        }).catch(err => {
            console.log('error', err)
        })
    }

    let arr = [1,2,3,4,5,6,7,8,9,10,11,12]

    const handleParam = (val) => {
        setParam(val)
    }

    return (
        <div className='p-4 mb-14'>
            <div className=' mb-3 flex'>
                <div>
                    <label className=''>Data: </label>
                    <select onChange={e=>handleParam(e.target.value)} name="sort" className='border-slate-300 border rounded p-2'>
                        <option value='temp'>Temperature</option>
                        <option value='dox'>Dissolved Oxygen</option>
                        <option value='ph'>pH</option>
                    </select>
                </div>
                {/* <div className='ml-3'>
                    <label>Sort: </label>
                    <select onChange={e=>console.log(e.target.value)} name="sort" className='border-slate-300 border rounded p-2'>
                        <option value='asc'>asc</option>
                        <option value='desc'>desc</option>
                    </select>
                </div> */}
            </div>
            <TableContainer component={Paper} sx={{  }}>
                <Table sx={{  }}>
                {/* <Table sx={{ minWidth: 700 }} aria-label="customized table"> */}
                    <TableHead>
                    <TableRow>
                    <StyledTableCell>
                        <span className='font-black'>
                            {   param === 'temp' &&
                                <>Temp in °C</>
                            }
                            {   param === 'dox' &&
                                <>Dissolved Oxygen mg/L</>
                            }
                            {   param === 'ph' &&
                                <>pH Level</>
                            }
                        </span>
                    </StyledTableCell>
                        <StyledTableCell><span className='font-black'>Time</span></StyledTableCell>
                        <StyledTableCell><span className='font-black'>Date</span></StyledTableCell>
                        {/* <StyledTableCell><span className='font-black'>Status</span></StyledTableCell> */}
                    </TableRow>
                    </TableHead>
                        {
                            readings?.map((i)=>(
                                <TableBody key={i._id}>
                                    <StyledTableRow>
                                        {   param === 'temp' &&
                                            <StyledTableCell component="th" scope="row">{i?.temp} °C</StyledTableCell>
                                        }
                                        {   param === 'dox' &&
                                            <StyledTableCell component="th" scope="row">{i?.dox} mg/L</StyledTableCell>
                                        }
                                        {   param === 'ph' &&
                                            <StyledTableCell component="th" scope="row">{i?.pH}</StyledTableCell>
                                        }
                                        
                                        <StyledTableCell >{moment(i?.createdAt).format('LT')}</StyledTableCell>
                                        <StyledTableCell >{moment(i?.createdAt).format('ll')}</StyledTableCell>
                                        {/* <StyledTableCell>Normal</StyledTableCell> */}
                                    </StyledTableRow>
                                </TableBody>
                            ))
                        }
                </Table>
            </TableContainer>

            <div className='mt-3 flex justify-center'>
                <Stack spacing={3}>
                    <Pagination onChange={(e,page)=>console.log(page)} count={5} page={1} variant='outlined' shape='rounded' />
                </Stack>
            </div>
            <NavBar></NavBar>
        </div>
    )
}
