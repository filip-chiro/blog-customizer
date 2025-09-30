import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	articleState: typeof defaultArticleState;
	setArticleState: React.Dispatch<
		React.SetStateAction<typeof defaultArticleState>
	>;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const optionsFont = fontFamilyOptions;
	const optionsFontColors = fontColors;
	const optionsContentWidth = contentWidthArr;
	const optionsBgColors = backgroundColors;
	const optionsFontSizeOptions = fontSizeOptions;

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(
		articleState.fontFamilyOption
	);
	const [selectedСolorFont, setSelectedСolorFont] = useState(
		articleState.fontColor
	);
	const [selectedBgСolor, setSelectedBgСolor] = useState(
		articleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		articleState.contentWidth
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		articleState.fontSizeOption
	);

	const toggleOpen = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const clearForm = (event: FormEvent) => {
		event.preventDefault();
		setSelectedBgСolor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedСolorFont(defaultArticleState.fontColor);
		setArticleState(defaultArticleState);
	};
	const submitForm = (event: FormEvent) => {
		event.preventDefault();
		setArticleState({
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedFontSize,
			fontColor: selectedСolorFont,
			contentWidth: selectedContentWidth,
			backgroundColor: selectedBgСolor,
		});
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleOpen} />
			<aside
				className={clsx(
					isMenuOpen ? styles.container_open : '',
					styles.container
				)}>
				<form className={styles.form} onSubmit={submitForm} onReset={clearForm}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={selectedFont}
						onChange={setSelectedFont}
						options={optionsFont}
						title='Шрифт'
					/>
					<RadioGroup
						selected={selectedFontSize}
						name='radio'
						onChange={setSelectedFontSize}
						options={optionsFontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={selectedСolorFont}
						onChange={setSelectedСolorFont}
						options={optionsFontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectedBgСolor}
						onChange={setSelectedBgСolor}
						options={optionsBgColors}
						title='Цвет фона'
					/>
					<Select
						selected={selectedContentWidth}
						onChange={setSelectedContentWidth}
						options={optionsContentWidth}
						title='Ширина Контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
