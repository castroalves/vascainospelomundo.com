import dynamic from 'next/dynamic';

const AddMemberMap = dynamic(() => import('./AddMemberMap'), {
  ssr: false
});

export default AddMemberMap;