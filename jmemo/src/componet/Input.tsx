"use client";
import React, { forwardRef, InputHTMLAttributes } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  allowedPattern?: RegExp;
  preventXSS?: boolean;
  trimWhitespace?: boolean;
  validateInput?: (value: string) => boolean;
  errorMessage?: string;
  showError?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      placeholder = "",
      className = "",
      maxLength = 100, // 최대 길이 기본값
      allowedPattern = /^[가-힣a-zA-Z0-9\s]*$/, // 한글, 영문, 숫자, 공백 허용
      preventXSS = true, // XSS 방지 기본값
      trimWhitespace = true, // 공백 제거 기본값
      validateInput, // 커스텀 유효성 검사 함수
      errorMessage, // 에러 메시지
      showError = false, // 에러 메시지 표시 여부
      ...props
    },
    ref
  ) => {
    // XSS 방지를 위한 위험한 문자 제거
    const sanitizeInput = (input: string): string => {
      if (!preventXSS) return input;

      return input
        .replace(/[<>'"&]/g, "") // HTML 문자 제거
        .replace(/javascript:/gi, "") // javascript: 프로토콜 제거
        .replace(/on\w+=/gi, ""); // 이벤트 핸들러 제거
    };

    // 입력값 유효성 검사 및 정제
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;

      // 최대 길이 제한
      if (inputValue.length > maxLength) {
        inputValue = inputValue.slice(0, maxLength);
      }

      // XSS 방지 (먼저 처리)
      inputValue = sanitizeInput(inputValue);

      // 허용된 패턴 검사 (한글 조합 중인 경우 예외 처리)
      if (allowedPattern && inputValue !== "") {
        // 한글 조합 중인지 확인 (자음/모음만 있는 경우)
        const isKoreanComposing = /^[ㄱ-ㅎㅏ-ㅣ]+$/.test(inputValue);

        if (!isKoreanComposing && !allowedPattern.test(inputValue)) {
          return; // 패턴에 맞지 않으면 입력을 막음
        }
      }

      // 커스텀 유효성 검사
      if (validateInput && !validateInput(inputValue) && inputValue !== "") {
        return;
      }

      // 최종 값 전달 (onChange에서 trimWhitespace 처리)
      onChange(inputValue);
    };

    // 포커스 아웃 시 공백 제거
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (trimWhitespace && value) {
        const trimmedValue = value.trim();
        if (trimmedValue !== value) {
          onChange(trimmedValue);
        }
      }

      // 기존 onBlur 이벤트 실행
      if (props.onBlur) {
        props.onBlur(e);
      }
    };

    // 기본 클래스와 사용자 정의 클래스 결합
    const inputClassName = `
      outline-none block w-full text-[#333c48] text-xl bg-transparent
      ${className}
    `.trim();

    return (
      <div className="w-full">
        <input
          ref={ref}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={handleBlur} // 포커스 아웃 시 trim 처리
          className={inputClassName}
          autoComplete="off"
          spellCheck="false"
          {...props}
        />

        {/* 에러 메시지 표시 */}
        {showError && errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}

        {/* 글자 수 표시 (옵션) */}
        {maxLength && value.length > maxLength * 0.8 && (
          <p className="text-gray-400 text-xs text-right mt-1">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
