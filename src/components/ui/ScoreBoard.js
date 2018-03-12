import React from 'react';
import './style/scoreboard.scss';

const ScoreBoard = ({
  isFetching,
  players,
  currentPlayer,
  onExpand,
  onClose,
  expanded,
}) => {
  const className = `ScoreBoard ScoreBoard__expanded--${expanded}`;

  const renderEmpty = () => {
    const loading = <h3>{'Loading...'}</h3>;
    const empty = <h3>{'List is Empty! Be the First One!'}</h3>;

    return (
      <div className={'ScoreBoard__empty'}>{isFetching ? loading : empty}</div>
    );
  };

  const renderTopPlayers = () => {
    return players.map(player => {
      const { id, name, score } = player;
      const isCurrent = id === currentPlayer;
      const className = `ScoreBoard__player ScoreBoard__player--current--${isCurrent}`;

      return (
        <div className={className} key={id}>
          <span>{name}</span>
          <span>{score}</span>
        </div>
      );
    });
  };

  const renderExpanded = () => {
    return (
      <div className={'ScoreBoard__chart'}>
        <span className={'ScoreBoard__close'} onClick={onClose}>
          X
        </span>
        <div className={'ScoreBoard__header'}>
          <h2>{'Top Players'}</h2>
        </div>
        {players.length ? renderTopPlayers() : renderEmpty()}
      </div>
    );
  };

  const renderClosed = () => {
    return (
      <div className={'ScoreBoard__expandable--wrapper'}>
        <h3 onClick={onExpand}>Score Board</h3>
      </div>
    );
  };

  return (
    <div className={className}>
      {expanded ? renderExpanded() : renderClosed()}
    </div>
  );
};

export default ScoreBoard;
