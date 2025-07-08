"use client";
import React, {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

interface BaseInputProps {
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
  successMessage?: string;
  showSuccess?: boolean;
  as?: "input" | "textarea"; // 렌더링할 요소 타입 추가
}

type InputProps = BaseInputProps &
  (BaseInputProps["as"] extends "textarea"
    ? Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value">
    : Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">);

//! - value: 필수, 입력값
//! - onChange: 필수, 값 변경 콜백 함수
//! - placeholder: 플레이스홀더 텍스트
//! - className: 추가 CSS 클래스
//! - maxLength: 최대 입력 길이 (기본값: 100)
//! - allowedPattern: 허용할 문자 패턴 (기본값: 한글, 영문, 숫자, 특수문자)
//! - preventXSS: XSS 방지 여부 (기본값: true)
//! - trimWhitespace: 공백 제거 여부 (기본값: true)
//! - validateInput: 커스텀 유효성 검사 함수
//! - errorMessage: 에러 메시지
//! - showError: 에러 표시 여부
//! - successMessage: 성공 메시지 (새로 추가)
//! - showSuccess: 성공 메시지 표시 여부 (새로 추가)
//! - as: 렌더링할 요소 타입 ('input' | 'textarea', 기본값: 'input')
//! - ...기타 HTML input/textarea 속성들 (type, disabled, readonly 등)

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      value,
      onChange,
      placeholder = "",
      className = "",
      maxLength = 100,
      allowedPattern = /^[가-힣a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{}|;:,.<>?`~]*$/,
      preventXSS = true,
      trimWhitespace = true,
      validateInput,
      errorMessage,
      showError = false,
      successMessage, // 성공 메시지
      showSuccess = false, // 성공 메시지 표시 여부
      as = "input", // 기본값은 input
      ...props
    },
    ref
  ) => {
    // XSS 방지를 위한 위험한 문자 제거 (하지만 허용된 특수문자는 제외)
    const sanitizeInput = (input: string): string => {
      if (!preventXSS) return input;

      return input
        .replace(/javascript:/gi, "") // javascript: 프로토콜 제거
        .replace(/on\w+=/gi, "") // 이벤트 핸들러 제거
        .replace(/<script[\s\S]*?<\/script>/gi, "") // script 태그 제거
        .replace(/<iframe[\s\S]*?<\/iframe>/gi, "") // iframe 태그 제거
        .replace(/style\s*=\s*["'][^"']*["']/gi, ""); // style 속성 제거
    };

    // 입력값 유효성 검사 및 정제
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      let inputValue = e.target.value;

      // 최대 길이 제한
      if (inputValue.length > maxLength) {
        inputValue = inputValue.slice(0, maxLength);
      }

      // XSS 방지 (먼저 처리)
      inputValue = sanitizeInput(inputValue);

      // 허용된 패턴 검사 (한글 조합 과정 모두 허용)
      if (allowedPattern && inputValue !== "") {
        // 한글 관련 문자인지 확인 (자음, 모음, 완성된 한글 모두 허용)
        const hasKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(inputValue);

        // 한글이 포함되어 있으면 일단 허용 (조합 과정 고려)
        // 한글이 없는 경우에만 패턴 검사
        if (!hasKorean && !allowedPattern.test(inputValue)) {
          return; // 패턴에 맞지 않으면 입력을 막음
        }
      }

      // 커스텀 유효성 검사
      if (validateInput && !validateInput(inputValue) && inputValue !== "") {
        return;
      }

      // 최종 값 전달
      onChange(inputValue);
    };

    // 포커스 아웃 시 공백 제거만 수행
    const handleBlur = (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      let finalValue = value;

      // 공백 제거만 수행 (패턴 검사는 onChange에서 이미 처리)
      if (trimWhitespace && finalValue) {
        finalValue = finalValue.trim();
      }

      // 값이 변경되었으면 업데이트
      if (finalValue !== value) {
        onChange(finalValue);
      }

      // 기존 onBlur 이벤트 실행
      if (props.onBlur) {
        props.onBlur(e as any);
      }
    };

    // 기본 클래스와 사용자 정의 클래스 결합
    const inputClassName = `
      outline-none block w-full text-[#333c48] text-xl bg-transparent
      ${as === "textarea" ? "resize-none" : ""}
      ${className}
    `.trim();

    // textarea 전용 스타일
    const textareaStyle =
      as === "textarea"
        ? {
            verticalAlign: "top" as const,
            textAlign: "left" as const,
            paddingTop: "0",
            marginTop: "0",
          }
        : {};

    const commonProps = {
      value,
      placeholder,
      onChange: handleInputChange,
      onBlur: handleBlur,
      className: inputClassName,
      autoComplete: "off" as const,
      spellCheck: false,
      style: textareaStyle,
      ...props,
    };

    return (
      <>
        {as === "textarea" ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...(commonProps as any)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type="text"
            {...(commonProps as any)}
          />
        )}

        {/* 에러 메시지 표시 */}
        {showError && errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}

        {/* 성공 메시지 표시 */}
        {showSuccess && successMessage && (
          <p className="text-green-500 text-sm mt-1">{successMessage}</p>
        )}

        {/* 글자 수 표시 (옵션) */}
        {maxLength && value.length > maxLength * 0.8 && (
          <p className="text-gray-400 text-xs text-right mt-1">
            {value.length}/{maxLength}
          </p>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;

/*
=== 사용 예시 ===

1. 기본 사용법 (기본 보안 설정 적용)
<Input
  value={title}
  onChange={setTitle}
  placeholder="제목을 입력하세요"
/>

2. textarea로 사용 (여러 줄 입력)
<Input
  as="textarea"
  value={content}
  onChange={setContent}
  placeholder="내용을 입력하세요"
  className="w-full h-full"
  maxLength={1000}
/>

3. 에러 메시지와 성공 메시지 모두 사용
<Input
  value={username}
  onChange={setUsername}
  placeholder="사용자명"
  validateInput={(value) => value.length >= 3 && value.length <= 20}
  errorMessage="사용자명은 3-20자 사이여야 합니다"
  showError={username.length > 0 && (username.length < 3 || username.length > 20)}
  successMessage="사용 가능한 사용자명입니다"
  showSuccess={username.length >= 3 && username.length <= 20}
  maxLength={20}
/>

4. 비밀번호 입력 (에러/성공 메시지)
<Input
  value={password}
  onChange={setPassword}
  placeholder="비밀번호"
  type="password"
  validateInput={(value) => value.length >= 8}
  errorMessage="비밀번호는 8자 이상이어야 합니다"
  showError={password.length > 0 && password.length < 8}
  successMessage="안전한 비밀번호입니다"
  showSuccess={password.length >= 8}
  maxLength={50}
/>

5. 이메일 검증
<Input
  value={email}
  onChange={setEmail}
  placeholder="이메일"
  allowedPattern={/^[a-zA-Z0-9@._-]*$/}
  validateInput={(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)}
  errorMessage="올바른 이메일 형식이 아닙니다"
  showError={email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
  successMessage="올바른 이메일 형식입니다"
  showSuccess={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
  maxLength={50}
/>

6. 실시간 중복 검사 (API 연동 예시)
<Input
  value={nickname}
  onChange={setNickname}
  placeholder="닉네임"
  errorMessage={nicknameError}
  showError={!!nicknameError}
  successMessage="사용 가능한 닉네임입니다"
  showSuccess={nicknameValid}
  maxLength={20}
/>
*/
