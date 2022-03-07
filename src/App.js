import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import NormalizeCss from "./NormalizeCss";
import { ToggleButton } from "@mui/material";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 4rem;
  height: 100vh;
  width: 100vw;
  margin: 4rem 0;
`;

const CashStatusStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlaceBetStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResetCashStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const LosingAlert = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  const [cash, setCash] = React.useState(1000);
  const [bet, setBet] = React.useState(1);
  const [pseudoSmartStrategy, setPseudoSmartStrategy] = React.useState(false);

  return (
    <>
      <NormalizeCss />
      <Wrapper>
        <Typography variant="h4" as="h1" textAlign="center">
          The winner takes it all.
          <br />
          The loser has to fall.
        </Typography>
        <CashStatus cash={cash} />
        <PlaceBet
          setCash={setCash}
          bet={bet}
          setBet={setBet}
          pseudoSmartStrategy={pseudoSmartStrategy}
          enabled={cash > 0}
        />
        <ResetCash
          setCash={setCash}
          pseudoSmartStrategy={pseudoSmartStrategy}
          setPseudoSmartStrategy={setPseudoSmartStrategy}
        />
        {cash <= 0 && (
          <LosingAlert>
            <Typography variant="h4">
              You have waisted all of your reserve money. No one trusts you any
              more.
            </Typography>
          </LosingAlert>
        )}
      </Wrapper>
    </>
  );
}

function CashStatus({ cash }) {
  return (
    <CashStatusStyled>
      <Typography variant="h5" as="body1">
        You have{" "}
        {cash.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </Typography>
    </CashStatusStyled>
  );
}

function PlaceBet({ setCash, bet, setBet, pseudoSmartStrategy, enabled }) {
  const [betState, setBetState] = React.useState(0);
  return (
    <PlaceBetStyled>
      <TextField
        type="number"
        value={bet}
        onChange={(e) => setBet(+e.target.value)}
        label="Place Bet"
        disabled={!enabled}
      />
      <div style={{ display: "flex" }}>
        {betState === 0 ? (
          <Button
            id="play"
            disabled={!enabled}
            onClick={() => {
              setBetState(Math.random());
            }}
          >
            Play
          </Button>
        ) : (
          <Button
            id="collect"
            disabled={!enabled}
            onClick={() => {
              setCash((c) => c + bet * (betState > 0.5 ? 1 : -1));
              setBet((bet) =>
                pseudoSmartStrategy && betState <= 0.5 ? bet * 2 : 1
              );
              setBetState(0);
            }}
          >
            Collect
          </Button>
        )}
      </div>
      <div style={{ position: "relative" }}>
        {betState > 0 && (
          <Typography
            variant="body2"
            style={{ textAlign: "center", position: "absolute", width: "100%" }}
          >
            {betState > 0.5 ? "Won" : "Lost"}
          </Typography>
        )}
      </div>
    </PlaceBetStyled>
  );
}

function ResetCash({ setCash, pseudoSmartStrategy, setPseudoSmartStrategy }) {
  const [newAmount, setNewAmount] = React.useState(1000);
  return (
    <ResetCashStyled>
      <TextField
        type="number"
        value={newAmount}
        onChange={(e) => setNewAmount(+e.target.value)}
      />
      <Button onClick={() => setCash(newAmount)}>Reset Cash Reserves</Button>
      <ToggleButton
        value="check"
        selected={pseudoSmartStrategy}
        onChange={() => setPseudoSmartStrategy((s) => !s)}
      >
        Smart Strategy
      </ToggleButton>
      <Button
        onClick={async () => {
          while (true) {
            await new Promise((res) => {
              setTimeout(() => {
                document.querySelector("#play").click();
                res();
              }, 0);
            });
            await new Promise((res) => {
              setTimeout(() => {
                document.querySelector("#collect").click();
                res();
              }, 0);
            });
          }
        }}
      >
        Run 1 player game
      </Button>
    </ResetCashStyled>
  );
}
