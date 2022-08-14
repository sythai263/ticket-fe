import FormUpdateProgram from 'components/Admin/FormProgram';
import { useParams } from 'react-router-dom';

const SingleProgram = () => {
  const params = useParams();
  const id = Number(params.id);
  return <FormUpdateProgram id={id} />;
};

export default SingleProgram;
