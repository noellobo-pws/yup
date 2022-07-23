import * as React from 'react';
import * as yup from 'yup';

const schema = yup.object().shape({
  file: yup
    .mixed()
    .test('required', 'You need to provide a file', (value) => {
      return value && value.length;
    })
    .test('fileSize', 'The file is too large', (value, context) => {
      return value && value[0] && value[0].size <= 200000;
    })
    .test('type', 'We only support jpeg', function (value) {
      console.log('value[0].type', value);
      return value && value[0] && value[0].type === 'image/jpeg';
    }),
});

function App() {
  const handleChange = async (e) => {
    try {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[0];
        console.log('file', file);
        await schema.validate({ file });
      }
    } catch (err) {
      console.log('err', err.toString());
    }
  };

  return <input onChange={handleChange} type="file" />;
}

export default App;
