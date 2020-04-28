import React, { Component } from 'react';
import './styles.css'

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>    
        <section id="main-page">
                <div class="wrapper">
                   <br></br> <br></br> <h2>Организуйте своё <br></br>
            <strong>Индивидуальное путешествие</strong></h2> 
        </div>
    </section>

    <section id="steps">
        <div class="wrapper">
            <ul>
                <li id="step-1">
                    <h4>Планирование</h4>
                    <p>Можете положиться на нас. Мы соответствуем вашим ожиданиям.</p>
                </li>
                <li id="step-2">
                    <h4>Организованность</h4>
                    <p>Bоспользуйтесь опытом наших специалистов, 
                      они будут сопровождать Вас в реализации Вашей поездки.</p>
                </li>
                <li id="step-3">
                    <h4>Путешествие</h4>
                    <p>Мы позаботимся о том, чтобы обеспечить вашу безопасность и полное спокойствие на протяжении всей поездки.</p>
                </li>
                <div class="clear"></div>
            </ul>
        </div>
    </section>

    <section id="contact">
        <div class="wrapper">
            <h3>Выбирайте нас</h3>
            <p>В туристическом агентстве мы знаем, что путешествие - это человеческое приключение, 
              а также важное финансовое обязательство для вас. Вот почему мы считаем честью учитывать все ваши ожидания, 
              чтобы помочь вам в подготовке вашего индивидуального пребывания, кругооборота или поездки.
            </p>

        </div>
    </section>

    

      </div>
    );
  }
}
