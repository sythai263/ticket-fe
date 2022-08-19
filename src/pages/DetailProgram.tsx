import api from 'api/program.api';
import { useAppDispatch } from 'app/hooks';
import { AxiosResponse } from 'axios';
import DetailProgramComponent from 'components/DetailProgram';
import { ProgramType } from 'constants/types/program/programType';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailProgramPage = () => {
  const params = useParams();
  const initial = {} as ProgramType;
  const [program, setProgram] = useState(initial);
  const id = Number(params.id);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(0));
    api.getDetail(id).then((response: AxiosResponse) => {
      const data = response.data as ProgramType;
      setProgram(data);
    });
  }, [id, dispatch]);
  return <DetailProgramComponent {...program} />;
};

export default DetailProgramPage;
