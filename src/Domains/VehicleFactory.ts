// class KeyFactory {
//   public static create(key: IKey): IKey & IValid {
//     if (key.type === KeyTypes.CPF) {
//       return new CPF(key.value, key.owner);
//     }
//     if (key.type === KeyTypes.PHONE_NUMBER) {
//       return new PhoneNumber(key.value, key.owner);
//     }
//     throw new Error('Invalid Key Type!');
//   }
// }

// export default KeyFactory;