import { useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';

function App() {
  const { data, loading, error } = useFetch(
    'https://chess-puzzles.p.rapidapi.com/?id=HxxIU'
  );

  const fenArray = data?.puzzles[0].fen.split(' ')[0].split('/');

  const Pieces = {
    p: '♟',
    r: '♜',
    n: '♞',
    b: '♝',
    q: '♛',
    k: '♚',
    P: '♙',
    R: '♖',
    N: '♘',
    B: '♗',
    Q: '♕',
    K: '♔',
  };

  return (
    <div className='App'>
      <p>
        <b>FEN:</b> {data?.puzzles[0].fen}
      </p>
      <p>
        <b>Rating:</b> {data?.puzzles[0].rating}
      </p>

      <table className='chess-board'>
        <tbody>
          <tr>
            <th></th>
            <th>a</th>
            <th>b</th>
            <th>c</th>
            <th>d</th>
            <th>e</th>
            <th>f</th>
            <th>g</th>
            <th>h</th>
          </tr>
          {fenArray?.map((row: string, i: number) => {
            let arrayValues: string[] = [];

            row.split('').map((value) => {
              if (value >= '0' && value <= '9') {
                for (let i = 0; i < value; i++) {
                  arrayValues.push(' ');
                }
              } else {
                arrayValues.push(Pieces[value]);
              }
            });

            return (
              <tr>
                <th>{8 - i}</th>
                {arrayValues.map((value, index) => {
                  if (i % 2 === 0) {
                    return (
                      <td className={index % 2 === 0 ? 'light' : 'dark'}>
                        {value}
                      </td>
                    );
                  } else {
                    return (
                      <td className={index % 2 === 0 ? 'dark' : 'light'}>
                        {value}
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
