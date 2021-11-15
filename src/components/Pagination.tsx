import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type Props = {
    setValue: Function;
    count:number,
    page:number,
  };
export const PaginationOutlined:React.FC<Props>=({setValue,count, page}:Props)=> {
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setValue(value);
      };
  return (
    <Stack spacing={2} sx={{width:'400px', justifyContent:'center', margin:'20px auto 30px auto', backgroundColor:' #ffffff', padding:'10px'}}>
      <Pagination  page={page} count={count} variant="outlined" color="primary" onChange={handleChange}  />
    </Stack>
  );
}
