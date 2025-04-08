import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale/ko';
import styled from 'styled-components';
import media from '../../../styles/media';

interface ICalendar {
  date: null | Date;
  setDate: React.Dispatch<React.SetStateAction<null | Date>>;
  minDateTime: Date;
  maxDateTime: Date;
}

const CustomCalendar: React.FC<ICalendar> = ({
  date,
  setDate,
  minDateTime,
  maxDateTime,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  registerLocale('ko', ko);
  console.log(minDateTime, maxDateTime);

  return (
    <DatePickerBox>
      <DatePicker
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        dateFormat="yyyy년 MM월 dd일 a hh:mm"
        locale="ko"
        dateFormatCalendar="yyyy년 MM월"
        selected={date}
        showTimeInput
        onChange={(day) => {
          setDate(day);
          console.log(day);
        }}
        shouldCloseOnSelect={false}
        open={isOpen}
        onFocus={() => setIsOpen(true)}
        onClickOutside={() => setIsOpen(false)}
        minDate={minDateTime}
        maxDate={maxDateTime}
        // minTime, maxTime 조건 추가
      />
    </DatePickerBox>
  );
};

export default CustomCalendar;

const DatePickerBox = styled.div`
  .react-datepicker__input-container {
    width: 636px;
    height: 45px;
    border-radius: 7px;
    border: 1px solid #8f8e94;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;

    ${media.medium`
            width: 464px;
        `}
  }

  input {
    width: 100%;
    font-size: 18px;
    font-family: Pretendard;
    font-style: normal;
    line-height: 18px;
    letter-spacing: -0.165px;
    border: none;
    outline: none;
    readonly: true;
    caret-color: transparent;
  }
`;
