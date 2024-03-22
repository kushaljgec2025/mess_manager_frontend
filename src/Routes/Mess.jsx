import React from 'react';
import { useParams } from 'react-router-dom';

function Mess() {
	const { id } = useParams();
	return <div>Mess {id}</div>;
}

export default Mess;
