import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <div className='loading'>
        <ReactLoading type='spinningBubbles' color='#00bf63' width={'100px'} height={'100px'}/>
    </div>
  )
}

export default Loading