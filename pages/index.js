'use client';

import { useEffect, useState } from 'react';

export default function Home() {
	const [words, setWords] = useState([]);
	const [allLetters, setAllLetters] = useState([]);
	const [typedLetters, setTypedLetters] = useState([]);
	const [spacing, setSpacing] = useState(0);

	let actualIndex = 0;

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
	}

	useEffect(() => {
		setWords(allWords);
		saveActualLetters(allWords);
		const typed = [...typedLetters];
		document.addEventListener('keyup', function (event) {
			if ((event.key >= 'a' && event.key <= 'z') || event.key == ' ' || event.key == 'Backspace') {
				if (event.key == 'Backspace') {
					typed.pop();
				} else {
					typed.push(event.key);
				}
				setTypedLetters([...typed]);
			} else {
			}
			setSpacing((typedLetters.length / allLetters.length) * 100);
			console.log(typedLetters.length);
			console.log(allLetters.length);
		});
	}, []);

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24 bg-black'>
			<div className='border overflow-hidden border-white p-6 w-[66vw] relative'>
				<div className={`${spacing <= 10 ? 'text-green-500' : ''} flex text-white/30`}>
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
													? 'text-green-500'
													: 'bg-red-500'
												: ''
										} text-transparent`}>
										x
									</span>
								) : (
									letter
								)}
							</p>
						);
					})}
				</div>
			</div>
		</main>
	);
}
