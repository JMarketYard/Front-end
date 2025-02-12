import styled from 'styled-components';
import RaffleDetailProps from '../../components/RaffleDetailProps';
import { useParams, useLocation } from 'react-router-dom';

const AskPage = () => {
  const location = useLocation();
  const { raffle } = location.state || {};
};

export default AskPage;
