const hre = require("hardhat");
async function main() {
  const [owner, somebodyElse] = await hre.ethers.getSigners();
  const keyboardsContract = await hre.ethers.deployContract("Keyboards");
  await keyboardsContract.waitForDeployment();

  console.log("Contract deployed to:", keyboardsContract.target);

  let keyboards = await keyboardsContract.getKeyboards();
  console.log("We got the keyboards!", keyboards);

  const keyboardTxn1 = await keyboardsContract.create(
    "A really great keyboard!"
  );
  await keyboardTxn1.wait();

  const keyboardTx2 = await keyboardsContract
    .connect(somebodyElse)
    .create("An even better keyboard!");
  await keyboardTx2.wait();

  keyboards = await keyboardsContract.getKeyboards();
  console.log("We got the keyboards!", keyboards);

  keyboards = await keyboardsContract.connect(somebodyElse).getKeyboards();
  console.log("And as somebody else!", keyboards);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
