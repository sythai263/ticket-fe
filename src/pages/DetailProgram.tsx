import api from 'api/program.api';
import { AxiosResponse } from 'axios';
import DetailProgramComponent from 'components/DetailProgram';
import { ProgramType } from 'constants/types/program/programType';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailProgramPage = () => {
  const params = useParams();
  const initial = {} as ProgramType;
  const [program, setProgram] = useState(initial);
  const id = Number(params.id);
  useEffect(() => {
    api.getDetail(id).then((response: AxiosResponse) => {
      const data = response.data as ProgramType;
      setProgram(data);
    });
  }, [id]);
  return <DetailProgramComponent {...program} />;
};

export default DetailProgramPage;
