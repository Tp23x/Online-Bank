import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthProvider';



export default function UserList() {

  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const { userList } = useContext(AuthContext)


  useEffect(() => {
    userList(setUsers)
  }, [setUsers, userList])
  return (

    <TableContainer>
      <Table sx={{ minWidth: 650, borderCollapse: 'inherit', borderSpacing: '0 20px' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }}>ชื่อ</TableCell>
            <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="left">นามสกุล</TableCell>
            <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="left">บทบาท</TableCell>
            <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">สถานะ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, i) => (
            <TableRow
              key={i}
              onClick={() => navigate(`/Settings/User/${user.userID}`)}
              sx={{
                fontSize: '18px', cursor: 'pointer', '&:hover': {
                  background: '#f7f7f7'
                }
              }}
            >
              <TableCell component="th" scope="row" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderLeft: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7', borderRadius: '5px 0 0 5px' }}>
                {user.firstname}
              </TableCell>
              <TableCell align="left" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7' }}>{user.lastname}</TableCell>
              <TableCell align="left" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7' }}>{user.roleID.roleName}</TableCell>
              <TableCell align="center" sx={{ color: `${(user.status === true && '#27E900') || '#CACFD2'}`, fontSize: '18px', borderTop: '2px solid #D7D7D7', borderRight: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7', borderRadius: ' 0 5px 5px 0' }}>{(user.status === true && 'Active') || 'InActive'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
