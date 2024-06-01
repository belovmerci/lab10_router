import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Задача 1: Компонент SelectBox с городами и сообщением
const SelectBoxWithCities = () => {
  const cities = ['Рио-де-Жанейро', 'Сан-Паулу', 'Бразилиа', 'Сальвадор', 'Флорианополис'];
  const [selectedCity, setSelectedCity] = React.useState('');

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="">Выберите город</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>{city}</option>
        ))}
      </select>
      {selectedCity !== 'Рио-де-Жанейро' && <p>Нет, это не Рио-де-Жанейро!</p>}
    </div>
  );
};

// Задача 2: Компонент Calculator с двумя полями ввода и результатом

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState('');

  const handleNum1Change = (e) => {
    setNum1(e.target.value);
  };

  const handleNum2Change = (e) => {
    setNum2(e.target.value);
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const handleCalculate = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (!isNaN(n1) && !isNaN(n2)) {
      let calculatedResult;
      switch (operation) {
        case '+':
          calculatedResult = n1 + n2;
          setResult(`${n1} + ${n2} = ${calculatedResult}`);
          break;
        case '-':
          calculatedResult = n1 - n2;
          setResult(`${n1} - ${n2} = ${calculatedResult}`);
          break;
        case '*':
          calculatedResult = n1 * n2;
          setResult(`${n1} * ${n2} = ${calculatedResult}`);
          break;
        case '/':
          calculatedResult = n1 / n2;
          setResult(`${n1} / ${n2} = ${calculatedResult}`);
          break;
        default:
          setResult('');
      }
    } else {
      setResult('');
    }
  };

  return (
    <div>
      <input type="number" value={num1} onChange={handleNum1Change} />
      <select value={operation} onChange={handleOperationChange}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input type="number" value={num2} onChange={handleNum2Change} />
      <button onClick={handleCalculate}>=</button>
      <span>{result}</span>
    </div>
  );
};

// Задача 3: Калькулятор чисел с основанием
const NumbersInBaseCalculator = () => {
  const [number, setNumber] = useState('');
  const [base, setBase] = useState(10);
  const [result, setResult] = useState('');

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  const handleBaseChange = (event) => {
    setBase(parseInt(event.target.value));
  };

  const convertToBase = (number, base) => {
    if (!Number.isInteger(Number(number)) || base < 2 || base > 36) {
      return 'Invalid input';
    }
    return parseInt(number, 10).toString(base);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setResult(convertToBase(number, base));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Число:
          <input type="text" value={number} onChange={handleChange} />
        </label>
        <label>
          Основание:
          <input type="text" value={base} onChange={handleBaseChange} />
        </label>
        <button type="submit">Перевести</button>
      </form>
      <div>
        Результат: {result}
      </div>
    </div>
  );
};


// Задача 4: Калькулятор прожитых секунд
const AgeCalculator = () => {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [ageInSeconds, setAgeInSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgeInSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const birthDate = new Date(dateOfBirth);
    const currentDateTime = new Date();
    const ageInSeconds = (currentDateTime - birthDate) / 1000;
    setAgeInSeconds(ageInSeconds);
  };

  return (
    <div>
      <h2>Калькулятор возраста</h2>
      <form onSubmit={handleSubmit}>
        <label>Дата рождения:</label>
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        <button type="submit">Вычислить возраст</button>
      </form>
      <p>Вы прожили: {ageInSeconds} секунд.</p>
    </div>
  );
};


// Задача 5: Список чисел с фильтром
const NumberListWithFilter = () => {
  const [numberInput, setNumberInput] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleInputChange = (e) => {
    setNumberInput(e.target.value);
  };

  const handleAddNumber = () => {
    const newNumber = parseInt(numberInput);
    if (!isNaN(newNumber)) {
      setNumbers([...numbers, newNumber]);
      setNumberInput('');
    }
  };

  const filterNumbers = (num) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'even') {
      return num % 2 === 0;
    } else if (filter === 'odd') {
      return num % 2 !== 0;
    }
  };

  return (
    <div>
      <h2>Список чисел с фильтрацией</h2>
      <input type="number" value={numberInput} onChange={handleInputChange} />
      <button onClick={handleAddNumber}>Добавить</button>
      <div>
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('even')}>Четные</button>
        <button onClick={() => setFilter('odd')}>Нечетные</button>
      </div>
      <ul>
        {numbers.filter(filterNumbers).map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
    </div>
  );
};

// Задача 6: Регистрационная форма
const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError('Пожалуйста, заполните все поля корректно.');
      return;
    }
    setError('');
    // Отправка формы куда-то...
    console.log('Form submitted:', { username, password });
  };

  const validateForm = () => {
    if (!username || !password || !confirmPassword) {
      return false;
    }
    if (username.length < 6 || username.length > 20) {
      return false;
    }
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <h2>Форма регистрации</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Пароль:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Повторите пароль:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

// Задача 7: Форма редактирования
const ProfileEditForm = () => {
  const [name, setName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError('Пожалуйста, заполните все обязательные поля корректно.');
      return;
    }
    setError('');
    // Handle form submission here (e.g., API call)
    console.log('Form submitted:', { name, middleName, lastName, dateOfBirth, address });
  };

  const validateForm = () => {
    if (!name || !middleName || !lastName) {
      return false;
    }
    // Additional validation logic for date of birth and address can be added here
    return true;
  };

  return (
    <div>
      <h2>Форма редактирования профиля</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя*:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Отчество*:</label>
          <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
        </div>
        <div>
          <label>Фамилия*:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Дата рождения:</label>
          <input type="text" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </div>
        <div>
          <label>Адрес:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <button type="submit">Сохранить</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path='forms' element={
          <div>
          <h1>Задачи про формы</h1>
    
          <h2>Задача 1: Не Рио-Де-Жанейро</h2>
          <SelectBoxWithCities />
          
          <h2>Задача 2: Калькулятор</h2>
          <Calculator />
          
          <h2>Задача 3: Калькулятор чисел с основанием </h2>
          <NumbersInBaseCalculator />
          
          <h2>Задача 4: Калькулятор прожитых секунд</h2>
          <AgeCalculator />
    
          <h2>Задача 5: Список чисел с фильтром</h2>
          <NumberListWithFilter />
          </div>
        } />

        <Route path='validation' element={
        <div>
        <h1>Задачи про валидацию</h1>

        <h2>Задача 1: Регистрационная форма</h2>
        <RegistrationForm />

        <h2>Задача 2 : Форма редактирования</h2>
        <ProfileEditForm />
        </div>
        } />
        <Route path='/' element={<div>Welcome to the application!</div>} />
        <Route path='*' element={<div>404 Page Not Found</div>} />

      </Routes>
    </Router>
  );
}

export default App;
