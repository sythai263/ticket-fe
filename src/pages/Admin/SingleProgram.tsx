import api from 'api/program.api';
import { AxiosResponse } from 'axios';
import FormProgram from 'components/Admin/FormProgram';
import { ProgramType } from 'constants/types/programType';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleProgram = () => {
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

  useEffect(() => {}, [id]);

  return <FormProgram {...program} />;
};

export default SingleProgram;
