import React, { memo, useState } from 'react';
import {
  CommentBox,
  CommentLeftBox,
  CommentRightBox,
  Emotion,
  FireComment,
  SecretComment,
  SecretCommentBox,
} from '../ComponentStyled';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFire,
  faLock,
  faUserSecret,
} from '@fortawesome/free-solid-svg-icons';
import { Instance } from 'components/Instance';

const CommentComponent = ({
  openUsers,
  questionId,
  commentId,
  comment,
  writer,
  userId,
  published,
  like_count,
  setPoint,
}) => {
  // 상태 관리 --------------------------------------------
  const [isOpened, setIsOpened] = useState(openUsers);
  const [fires, setFires] = useState(like_count);
  // 변수 관리 --------------------------------------------
  const accessToken = localStorage.getItem('access_token');
  const loggedInId = localStorage.getItem('id');
  const loggedInName = localStorage.getItem('name');

  // 함수 관리 --------------------------------------------
  const openComment = async () => {
    // 답변 공개
    if (published) {
      if (window.confirm('50포인트를 소모하여 해당 답변을 확인하시겠습니까?')) {
        await axios
          .get(
            `https://callmebyyourtext.xyz/questions/${questionId}/comments/${commentId}`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            const checkUser = res.data.open_user.find(
              (e) => e.id === loggedInId
            );
            if (checkUser) {
              setIsOpened(res.data.open_user);
            } else {
              alert('로그인 후 답변을 확인할 수 있습니다.');
              return;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return;
      }
    } else {
      alert('답변 공개가 제한된 질문입니다.');
    }
  };

  // 답변 추천
  const fireComment = async () => {
    if (loggedInName !== writer) {
      await Instance.get(
        `https://callmebyyourtext.xyz/comments/${commentId}/likes`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((res) => {
          setFires(res.data.like_count);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('본인의 답변은 추천할 수 없습니다.');
    }
  };
  // 답변 삭제
  const deleteComment = async () => {
    if (writer === loggedInName) {
      if (window.confirm('정말 해당 답변을 삭제하시겠습니까?')) {
        await axios
          .delete(
            `https://callmebyyourtext.xyz/questions/${questionId}/comments/${commentId}`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else return;
    }
  };
  return (
    <>
      {isOpened[0]?.id === loggedInId || writer === loggedInName ? (
        <CommentBox>
          <CommentLeftBox>
            <FontAwesomeIcon icon={faUserSecret} />{' '}
            <span>익명 답변 : {comment}</span>
            <Emotion>
              <FireComment onClick={fireComment}>
                {/* 답변 오픈 유저랑 답변 작성자랑 같으면 추천 글자 숨기기 */}
                {isOpened[0]?.name !== writer ? '추천' : ''}
              </FireComment>{' '}
              {/* 추천 0개일 경우 불 이모지 숨기기 */}
              {fires === 0 ? (
                ''
              ) : (
                <>
                  <FontAwesomeIcon icon={faFire} /> {fires}
                </>
              )}
            </Emotion>
          </CommentLeftBox>
          {writer === loggedInName ? (
            <CommentRightBox onClick={deleteComment}>삭제</CommentRightBox>
          ) : (
            ''
          )}
        </CommentBox>
      ) : (
        <SecretCommentBox>
          <SecretComment onClick={openComment}>
            <FontAwesomeIcon icon={faLock} /> 비공개 답변입니다.
          </SecretComment>
          <Emotion>
            {fires === 0 ? (
              ''
            ) : (
              <>
                <FontAwesomeIcon icon={faFire} /> {fires}
              </>
            )}
          </Emotion>
        </SecretCommentBox>
      )}
    </>
  );
};

export default memo(CommentComponent);
