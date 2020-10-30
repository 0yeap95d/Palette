import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import re
import urllib.request
from konlpy.tag import Okt
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# with open('aa.txt', 'r') as file:
# 	a = file.readlines()

# print(a)
# global X_dialog
# dialog_data = pd.read_csv('dialogSentence.csv')
# dialog_data['Sentence'].nunique(), dialog_data['Emotion'].nunique()
# dialog_data = dialog_data.dropna(subset=['Emotion'])
# dialog_data['Sentence'] = dialog_data['Sentence'].str.replace("[^ㄱ-ㅎㅏ-ㅣ가-힣 ]","")
# dialog_data['Sentence'].replace('', np.nan, inplace=True)
# dialog_data = dialog_data.dropna(subset=['Sentence'])
# stopwords = ['의','가','이','은','들','는','좀','잘','걍','과','도','를','으로','자','에','와','한','하다']
# okt = Okt()

# X_dialog = []
# for sentence in dialog_data['Sentence']:
#     temp_X = []
#     temp_X = okt.morphs(sentence, stem=True) # 토큰화
#     temp_X = [word for word in temp_X if not word in stopwords] # 불용어 제거
#     X_dialog.append(temp_X)

# tokenizer = Tokenizer()
# tokenizer.fit_on_texts(X_dialog)

# threshold = 3
# total_cnt = len(tokenizer.word_index)  # 단어의 수
# rare_cnt = 0  # 등장 빈도수가 threshold보다 작은 단어의 개수를 카운트
# total_freq = 0  # 훈련 데이터의 전체 단어 빈도수 총 합
# rare_freq = 0  # 등장 빈도수가 threshold보다 작은 단어의 등장 빈도수의 총 합

# # 단어와 빈도수의 쌍(pair)을 key와 value로 받는다.
# for key, value in tokenizer.word_counts.items():
#     total_freq = total_freq + value

#     # 단어의 등장 빈도수가 threshold보다 작으면
#     if (value < threshold):
#         rare_cnt = rare_cnt + 1
#         rare_freq = rare_freq + value

# vocab_size = total_cnt - rare_cnt + 2
# print('단어 집합의 크기 :',vocab_size)

# tokenizer = Tokenizer(vocab_size, oov_token = 'OOV')
# tokenizer.fit_on_texts(X_dialog)
# X_dialog = tokenizer.texts_to_sequences(X_dialog)
# print('--------------------')
# print(X_dialog)
# print('--------------------')
# X_dialog = str(X_dialog)
# file = open('aa.txt', 'w')
# file.write(X_dialog)   
# file.close()  
# print(tokenizer.texts_to_sequences('안녕 누구야'))