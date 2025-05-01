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
  const [minTime, setMinTime] = useState<Date>(minDateTime);
  const [maxTime, setMaxTime] = useState<Date>(maxDateTime);

  registerLocale('ko', ko);
  // console.log('DateTime', minDateTime, maxDateTime);
  // console.log('Time', minTime, maxTime);

  const handleDateChange = (date: null | Date) => {
    if (date == null) return;
    setDate(date);
    const isSameDay = (a: Date, b: Date) =>
      a.toDateString() === b.toDateString();

    if (isSameDay(date, minDateTime)) {
      setDate(minDateTime);
      setMinTime(minDateTime);
      setMaxTime(
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59),
      );
      // } else if (isSameDay(date, maxDateTime)) {
      //   setMinTime(
      //     new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0),
      //   );
      //   setMaxTime(maxDateTime);
    } else {
      setDate(date);
      setMinTime(
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0),
      );
      setMaxTime(
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59),
      );
    }
  };

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
        showTimeSelect
        timeIntervals={30}
        onChange={handleDateChange}
        shouldCloseOnSelect={false}
        open={isOpen}
        onFocus={() => setIsOpen(true)}
        onClickOutside={() => setIsOpen(false)}
        minDate={minDateTime}
        maxDate={maxDateTime}
        // minTime, maxTime 조건 추가
        minTime={minTime}
        maxTime={maxTime}
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
