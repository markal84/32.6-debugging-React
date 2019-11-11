import PlayersList from './PlayersList';
import Player from '../Player/Player';
import React from 'react';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<PlayersList players={[]} />);
});

it('renders current number of players', () => {
    const players = [
        {
            name: 'Kunegunda',
            score: 5
        },
        {
            name: 'Antoś',
            score: 0
        }
    ]

    const playerComponent = shallow(<PlayersList players={players} />);
    //console.log(playerComponent.debug());
    const expectedPlayersNumber = playerComponent.find(Player).length;
    expect(expectedPlayersNumber).toEqual(2);
});

it('checks if onScoreUpdate is called', () => {
    const players = [
        {
            name: 'Kunegunda',
            score: 5
        },
        {
            name: 'Antoś',
            score: 0
        }
    ]

    const mockedOnScoreUpdate = jest.fn();
    const playerComponent = shallow(<PlayersList players={players} onScoreUpdate={mockedOnScoreUpdate} />);
    const firstPlayer = playerComponent.find(Player).first();
    const onPlayerScoreChange = firstPlayer.prop('onPlayerScoreChange');
    onPlayerScoreChange(10);

    expect(mockedOnScoreUpdate).toBeCalledWith(0, 10);
});

it("should call onPlayerRemove", () => {
    const players = [
      {
        name: "Kunegunda",
        score: 5
      },
      {
        name: "Antoś",
        score: 0
      }
    ];
  
    const mockedOnPlayerRemove = jest.fn();
    const playerComponent = shallow(
      <PlayersList players={players} onPlayerRemove={mockedOnPlayerRemove} />
    );
    const firstPlayer = playerComponent.find(Player).first();
    const onPlayerRemove = firstPlayer.prop("onPlayerRemove");
    onPlayerRemove();
    expect(mockedOnPlayerRemove).toBeCalledWith(0);
  });