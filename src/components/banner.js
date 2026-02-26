import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MOBILE_BREAKPOINT = "768px";

const KNOWN_SOURCES = {
  duck: {
    message: (
      <>
        Nice duck 🦆! Did you know your duck is also a secure NFC tag? You can
        authenticate your duck by scanning it with your phone!
      </>
    ),
    status: "info",
  },
};

const STATUS_THEME = {
  info: {
    background: "#e8f4fd",
    border: "#2196f3",
    color: "#1a3c5e",
  },
  success: {
    background: "#e8f8e8",
    border: "#4caf50",
    color: "#1a3c1e",
  },
  error: {
    background: "#fdecea",
    border: "#f44336",
    color: "#5c1a1a",
  },
};

const Banner = () => {
  const [alert, setAlert] = useState(null); // { message, status, isHtml }
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const duck = params.get("duck");
    const quack = params.get("quack");
    if (duck && quack) {
      fetch(
        `http://localhost:8000/check?duck=${encodeURIComponent(duck)}&quack=${encodeURIComponent(quack)}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setAlert({
              message: data.message,
              status: data.status || "info",
              isHtml: true,
            });
          }
        })
        .catch(() => {});
      return;
    }

    const source = params.get("source");
    if (source && KNOWN_SOURCES[source]) {
      const { message, status } = KNOWN_SOURCES[source];
      setAlert({ message, status, isHtml: false });
    }
  }, []);

  if (!alert || dismissed) return null;

  const theme = STATUS_THEME[alert.status] || STATUS_THEME.info;

  return (
    <>
      <Overlay onClick={() => setDismissed(true)} />
      <Positioner>
        <AlertBox $theme={theme} role="alert">
          {alert.isHtml ? (
            <AlertText
              as="div"
              dangerouslySetInnerHTML={{ __html: alert.message }}
            />
          ) : (
            <AlertText as="div">{alert.message}</AlertText>
          )}
          <DismissButton
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            $color={theme.color}
          >
            &times;
          </DismissButton>
        </AlertBox>
      </Positioner>
    </>
  );
};

export default Banner;

/* On mobile the overlay is invisible (banner is inline); on desktop it dims the page. */
const Overlay = styled.div`
  @media (min-width: ${MOBILE_BREAKPOINT}) {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 900;
  }
`;

/* On mobile: static block in the normal flow. On desktop: fixed centered popover. */
const Positioner = styled.div`
  @media (max-width: calc(${MOBILE_BREAKPOINT} - 1px)) {
    display: block;
  }

  @media (min-width: ${MOBILE_BREAKPOINT}) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 901;
    width: min(520px, 90vw);
  }
`;

const AlertBox = styled.div`
  background-color: ${({ $theme }) => $theme.background};
  color: ${({ $theme }) => $theme.color};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 0.95rem;

  @media (max-width: calc(${MOBILE_BREAKPOINT} - 1px)) {
    border-left: 4px solid ${({ $theme }) => $theme.border};
    margin: 1vh 3vw;
    padding: 14px 20px;
  }

  @media (min-width: ${MOBILE_BREAKPOINT}) {
    position: relative;
    border-radius: 6px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
    padding: 40px 48px;
  }
`;

const AlertText = styled.p`
  margin: 0;
  line-height: 1.5;

  a {
    color: inherit;
    text-decoration: underline;
  }
`;

const DismissButton = styled.button`
  background: none;
  border: none;
  color: ${({ $color }) => $color};
  cursor: pointer;
  font-size: 1.3rem;
  line-height: 1;
  padding: 0;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }

  @media (max-width: calc(${MOBILE_BREAKPOINT} - 1px)) {
    flex-shrink: 0;
    margin-left: 16px;
  }

  @media (min-width: ${MOBILE_BREAKPOINT}) {
    position: absolute;
    top: 12px;
    right: 14px;
    font-size: 1.5rem;
  }
`;
