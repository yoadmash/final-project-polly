import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <div className='d-flex justify-content-center aling-items-center loading'>
        <ReactLoading type='spinningBubbles' color='#000000' width={'100px'} height={'100px'}/>
    </div>
  )
}

export default Loading