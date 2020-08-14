it('promisse test...', () => {});

// ! Modelo Padrão
// const getSomething = () => {
//   setTimeout(() => {
//     console.log('respondendo...');
//     return 11;
//   }, 3000)
// };

// const system = () => {
//   console.log('init');
//   const something = getSomething();
//   console.log(`Something is ${something}`);
//   console.log('end');
// }

// ! Com Callback
// const getSomething = callback => {
//   setTimeout(() => {
//     console.log('respondendo...');
//     callback(12);
//   }, 3000)
// };

// const system = () => {
//   console.log('init');
//   getSomething(some => {
//     console.log(`Something is ${some}`);
//     console.log('end');
//   });
// }

// ! Com Promise
// const getSomething = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('respondendo...');
//       resolve(13);
//     }, 3000)
//   })
// };

// const system = () => {
//   console.log('init');
//   getSomething().then(some => {
//     console.log(`Something is ${some}`);
//     console.log('end');
//   })
// }

// ! Com Promise
const getSomething = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('respondendo...');
      resolve(14);
    }, 3000);
  });
};

const system = async () => {
  console.log('init');
  const some = await getSomething();
  console.log(`Something is ${some}`);
  console.log('end');
};

system();
