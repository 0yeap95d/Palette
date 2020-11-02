import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import re
import urllib.request
from konlpy.tag import Okt
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences


global X_dialog
dialog_data = pd.read_csv('./models/dialogSentence.csv')
dialog_data['Sentence'].nunique(), dialog_data['Emotion'].nunique()
dialog_data.drop_duplicates(subset=['Sentence'], inplace=True) # converstion 열에서 중복인 내용이 있다면 중복 제거
dialog_data = dialog_data.dropna(subset=['Emotion'])
dialog_data['Sentence'] = dialog_data['Sentence'].str.replace("[^ㄱ-ㅎㅏ-ㅣ가-힣 ]","")
dialog_data['Sentence'].replace('', np.nan, inplace=True)
dialog_data = dialog_data.dropna(subset=['Sentence'])
stopwords = ['의','가','이','은','들','는','좀','잘','걍','과','도','를','으로','자','에','와','한','하다']
okt = Okt()

X_dialog = []
for sentence in dialog_data['Sentence']:
    temp_X = []
    temp_X = okt.morphs(sentence, stem=True) # 토큰화
    temp_X = [word for word in temp_X if not word in stopwords] # 불용어 제거
    X_dialog.append(temp_X)
