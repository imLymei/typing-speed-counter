'use client';

import { useEffect, useState } from 'react';

export default function Home() {
	const [words, setWords] = useState([]);
	const [allLetters, setAllLetters] = useState([]);
	const [typedLetters, setTypedLetters] = useState([]);
	const [spacing, setSpacing] = useState(0);
	const [wordsPerMinute, setWordsPerMinute] = useState(0);
	const [totalTime, setTotalTime] = useState(0);

	let done = false;

	let letterLength = 0;
	let score = 0;

	const allWords = [
		'casa',
		'ela',
		'ele',
		'foram',
		'sempre',
		'onde',
		'quando',
		'porque',
		'ama',
		'falar',
		'jogos',
		'quero',
		'poderiam',
		'respeito',
		'negócio',
		'pessoa',
		'dificuldade',
		'esperto',
		'velocidade',
		'cinema',
		'querido',
		'digitar',
		'falar',
		'escreveu',
		'gritou',
		'comigo',
		'lerdo',
		'dado',
		'lindo',
		'estranho',
		'garotada',
		'doce',
	];

	function randomNumberBetween(min, max) {
		return Math.round(min + Math.random() * (max - min));
	}

	function formatTime(time) {
		const minutes = formatTimeSegment(Math.floor(time / 60));
		const secondsNumber = time % 60;
		const seconds = formatTimeSegment(formatDecimal(secondsNumber, 2));

		return `${minutes}:${seconds}`;
	}

	function formatTimeSegment(time) {
		if (time < 10) {
			return '0' + time;
		}
		return time;
	}

	function formatDecimal(number, decimal) {
		if (number == 0) return 0;
		const realDecimal = Math.pow(10, decimal);
		return Math.round(number * realDecimal) / realDecimal;
	}

	function main() {
		function selectWords() {
			let selected = [];
			let chosen = 0;
			for (let i = 0; i < 30; i++) {
				do {
					chosen = randomNumberBetween(0, allWords.length - 1);
				} while (selected.includes(chosen));
				selected.push(allWords[chosen]);
			}
			setWords([...selected]);
			return selected;
		}

		function saveActualLetters(myWords) {
			let newArray = [];
			myWords.map((word, index) => {
				if (index != 0 && index != myWords.length) {
					newArray.push(' ');
				}
				const letters = word.split('');
				newArray.push(...letters);
			});
			setAllLetters([...newArray]);
			letterLength = newArray.length;
			return newArray;
		}

		let realWords;
		let everyLetters;

		if (done == false) {
			realWords = selectWords();
			console.log(realWords);

			everyLetters = saveActualLetters(realWords);
			console.log(everyLetters);
			done = true;
		} else {
			realWords = words;
			everyLetters = allLetters;
		}

		const typed = [...typedLetters];
		let startTime;

		document.addEventListener('keyup', function (event) {
			if ((event.key >= 'a' && event.key <= 'z') || event.key == ' ' || event.key == 'Backspace') {
				if (typed.length == 0) {
					startTime = Date.now();
				}
				if (event.key == 'Backspace') {
					typed.pop();
				} else {
					if (typed.length < letterLength - 1) {
						typed.push(event.key);
					} else if (typed.length == letterLength - 1) {
						typed.push(event.key);
						const finalTime = Date.now();
						let wpm = 0;
						if (score == 0) {
							setTotalTime((finalTime - startTime) / 1000);
							const tTime = (finalTime - startTime) / 1000;
							everyLetters.map((letter, index) => {
								if (letter == typed[index]) {
									console.log(everyLetters);
									score++;
								}
							});
							console.log(tTime);
							console.log(score);
							setWordsPerMinute(score / (tTime / 60));
							wpm = score / (tTime / 60);
						}
						console.log(wpm);
					}
				}
				setTypedLetters([...typed]);
			} else {
			}
			setSpacing((typed.length / letterLength) * 100);
		});
	}

	useEffect(main, []);

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24 bg-black' onLoad={main}>
			<div className='border overflow-hidden border-white h-16 w-[66vw] relative'>
				<div
					className={`${
						spacing >= 50 ? 'right-6' : 'left-6'
					} flex text-white/30 absolute top-1/2 -translate-y-1/2`}>
					{allLetters.map((letter, letterIndex) => {
						return (
							<p
								key={letterIndex}
								className={
									typedLetters.length - 1 >= letterIndex
										? typedLetters[letterIndex] == letter
											? 'text-green-500'
											: 'text-red-500'
										: ''
								}>
								{letter == ' ' ? (
									<span
										className={`${
											typedLetters.length - 1 >= letterIndex
												? typedLetters[letterIndex] == letter
													? 'text-transparent'
													: 'text-red-500'
												: 'text-transparent'
										}`}>
										_
									</span>
								) : (
									letter
								)}
							</p>
						);
					})}
				</div>
			</div>
			<h2 className='absolute top-12 text-2xl'>{`Tempo: ${formatTime(totalTime)}`}</h2>
			<h2 className='absolute top-44 text-4xl'>{`Pontuação: ${formatDecimal(
				wordsPerMinute,
				2
			)} palavras por minuto`}</h2>
		</main>
	);
}
