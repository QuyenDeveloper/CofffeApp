import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import '../css/Memos.css';

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const memos = await contract.getMemos();
        setMemos(memos);
      } catch (error) {
        console.error("Error fetching memos:", error);
      }
    };
    contract && fetchMemos();
  }, [contract]);


  const limitedMemos = memos.slice(6);
  return (
    <table className="memo-container">
      <thead>
        <tr>
          <th>Name</th>
          <th>Typename</th>
          <th>Location</th>
          <th>Message</th>
          <th>Timestamp</th>
          <th>From</th>
        </tr>
      </thead>
      <tbody>
      {limitedMemos.map((memo, index) => (
          
          <tr key={index}>
            <td>{memo.name}</td>
            <td>{memo.typename}</td>
            <td>{memo.location}</td>
            <td>{memo.message}</td>
            <td>{new Date(Number(memo.timestamp) * 1000).toLocaleString()}</td>
            <td>{memo.from}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Memos.propTypes = {
  state: PropTypes.shape({
    contract: PropTypes.object.isRequired,
  }).isRequired,
};

export default Memos;
