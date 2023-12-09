import React, { useEffect, useState } from 'react'
import GoBackLink from '../../Layout/GoBackLink'
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';
import Loading from '../../Layout/Loading';

const PollSummary = () => {

  const { id } = useParams();
  const { auth } = useAuth();
  const [poll, setPoll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPoll = async () => {
    try {
      const response = await axios.get(`/polls/${id}?include_answers=true`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        },
        withCredentials: true
      });
      setPoll(response.data.foundPoll);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  const checkAnswerCount = (answer_title) => {
    let sum = 0
    poll.answers.forEach((answerObj, a_index) => {
      answerObj.answers.forEach((answer, v_index) => {
        if(typeof answer.value === 'object' && answer.value !== null) {
          if(Object.keys(answer.value).includes('title')) {
            if(answer.value.title === answer_title)
            sum++;
          } else {
            Object.values(answer.value).forEach((value, v_index) => {
              if(value.title === answer_title) {
                sum++
              }
            });
          }
        }
      })
    })
    console.log(sum);
    // return sum;
  }

  useEffect(() => {
    getPoll();
  }, []);

  return (
    <>
      {isLoading
        ?
        <Loading />
        :
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <GoBackLink />
          {poll?.answers?.length > 0
            ?
            <>
              <pre className='mt-5'>{JSON.stringify(poll.answers, null, 2)}</pre>
              {checkAnswerCount('Checkbox 3')}
            </>
            :
            <p className='mt-5'>No one answered this poll yet</p>
          }
        </div>
      }
    </>
  )
}

export default PollSummary