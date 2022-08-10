var ABI_LIQUID_DRIVE = [{"inputs":[{"internalType":"uint256","name":"_estimatedPercentageOfSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"donation","type":"uint256"}],"name":"LiquidityDonation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"TokenClaim","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"}],"name":"availableOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"}],"name":"claimedOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"donate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"}],"name":"donationsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"end","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endedOn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"time","type":"uint256"}],"name":"lock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"participants","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalClaimableTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalClaimedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalEthDonated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTxs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
var ADDRESS_LIQUID_DRIVE = "0x5B25d9c4F522F14E8346D6be6A449e104Ac36a53";
var NETID = 56;

var currentAddr;
var networkID = 0;
var contractLiquidityDrive = null;
var web3 = null;
var tempWeb3 = null;

window.addEventListener('load', () => {
    //Reset
    currentAddr = null;
    contractLiquidityDrive = null;
    web3 = null;
    tempWeb3 = null;

    mainContractInfo();
    Connect();
})

async function mainContractInfo() {
    if (NETID == 56) {
        web3 = new Web3('https://bsc-dataseed1.binance.org:443');
    } else {
        web3 = new Web3('https://data-seed-prebsc-1-s2.binance.org:8545/');
    }
    contractLiquidityDrive = await new web3.eth.Contract(ABI_LIQUID_DRIVE, ADDRESS_LIQUID_DRIVE);

    update();
}

async function Connect() {
    if (window.ethereum) {
        tempWeb3 = new Web3(window.ethereum)
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
            let accounts = await window.ethereum.request({ method: 'eth_accounts' })
            currentAddr = accounts[0];

            window.ethereum.on('accountsChanged', (acc) => {
                window.location.reload();
            });

            window.ethereum.on('chainChanged', (chainId) => {
                window.location.reload();
            });

            runAPP()
            return
        } catch (error) {
            console.error(error)
        }
    }
}

$("#btn-connect").click(() => {
    if (window.ethereum) {
        Connect();
    } else {
        alert("Please install Metamask or Trust wallet first");
    }
})

$("#btn-connect-sub").click(() => {
    if (window.ethereum) {
        Connect();
    } else {
        alert("Please install Metamask or Trust wallet first");
    }
})

async function getCurrentWallet() {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
            currentAddr = accounts[0]
            var connectedAddr = currentAddr[0] + currentAddr[1] + currentAddr[2] + currentAddr[3] + currentAddr[4] + currentAddr[5] + '...' + currentAddr[currentAddr.length - 6] + currentAddr[currentAddr.length - 5] + currentAddr[currentAddr.length - 4] + currentAddr[currentAddr.length - 3] + currentAddr[currentAddr.length - 2] + currentAddr[currentAddr.length - 1]

            $("#btn-connect-text").text(connectedAddr);
			$("#btn-connect").prop("disabled", true);

            $("#btn-connect-sub").text(connectedAddr);
			$("#btn-connect-sub").prop("disabled", true);
        }
    }
}

function update() {
    console.log("Update");
    updateParameters();
}
setInterval(update, 5000);


async function runAPP() {
    networkID = await tempWeb3.eth.net.getId()
    if (networkID == NETID) {
        web3 = tempWeb3;
        contractLiquidityDrive = await new web3.eth.Contract(ABI_LIQUID_DRIVE, ADDRESS_LIQUID_DRIVE);

        getCurrentWallet();

        update();
    } else {
        $("#btn-connect-text").text("Wrong network!");
        $("#btn-connect-sub").text("Wrong network!");

        if (window.ethereum) {
            const data = [{
                    chainId: '0x38',
                    chainName: 'Binance Smart Chain',
                    nativeCurrency: {
                        name: 'BNB',
                        symbol: 'BNB',
                        decimals: 18
                    },
                    rpcUrls: ['https://bsc-dataseed.binance.org/'],
                    blockExplorerUrls: ['https://bscscan.com/'],
                }]
            /* eslint-disable */
            const tx = await window.ethereum.request({ method: 'wallet_addEthereumChain', params: data }).catch()
            if (tx) {
                console.log(tx)
            }
        }
    }
}



async function updateParameters() {
    if(contractLiquidityDrive){
        contractLiquidityDrive.methods.totalEthDonated().call().then(res => {
            //Total donated total-donation
            $("#total-donation").text((res/1e18).toFixed(2));
            console.log("total: " + (res/1e18).toFixed(2));
        })

        contractLiquidityDrive.methods.endedOn().call().then(res => {
            //End on
            if(res == 0){
                $("#liquid-add").css("display", "block");
                $("#liquid-claim").css("display", "none");
            }else {
                $("#liquid-add").css("display", "none");
                $("#liquid-claim").css("display", "block");
            }
        })
        
        if(currentAddr != null){
            contractLiquidityDrive.methods.donationsOf(currentAddr).call().then(res => {
                //Your donation
                $("#your-donation").text((res/1e18).toFixed(2));
                console.log("your bnb: " + (res/1e18).toFixed(2));
            })

            contractLiquidityDrive.methods.availableOf(currentAddr).call().then(res => {
                //Your token 9 decimal
                $("#your-co").text((res/1e9).toFixed(0));
                $("#your-co1").text((res/1e9).toFixed(0));
                console.log("your co: " + (res/1e18).toFixed(0));
            })
        }
    }
}



$("#btn-add").click(() => {
    console.log("click!")
    var amount = $("#input-bnb").val();
    if(amount <= 0){
        alert("Check input amount");
        return;
    }

    try {
        if (contractLiquidityDrive && currentAddr != null && currentAddr != undefined) {
            var amountInWei =  web3.utils.toWei(amount, 'ether');
            contractLiquidityDrive.methods.donate().send({
                value: amountInWei,
                from: currentAddr,
            })
        }
    } catch (error) {}

})