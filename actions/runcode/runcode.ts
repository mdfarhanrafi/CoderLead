import axios from 'axios';

const runCode = async () => {
  const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions',
  params: {
    base64_encoded: 'false',
    wait: 'false',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': '2e38c51e6fmsh109867f94783bf3p13dcdejsn5f7b13b816a0',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    language_id: 63,
    source_code: 'console.log("Hello, World!");',
    stdin: ''
  }
};

try {
	const response = await axios.request(options);
	return response.data;
} catch (error) {
	console.error(error);
}
};





const batchSubmission = async () => {
  
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
      base64_encoded: 'true'
    },
  headers: {
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    submissions: [
      {
        language_id: 46,
        source_code: 'ZWNobyBoZWxsbyBmcm9tIEJhc2gK'
      },
      {
        language_id: 71,
        source_code: 'cHJpbnQoImhlbGxvIGZyb20gUHl0aG9uIikK'
      },
      {
        language_id: 72,
        source_code: 'cHV0cygiaGVsbG8gZnJvbSBSdWJ5IikK'
      }
    ]
  }
};

try {
  const response = await axios.request(options);
	console.log(response.data);
  return response.data;
} catch (error) {
  console.error(error);
}
}

export default {runCode,batchSubmission};