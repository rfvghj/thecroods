var web3je = "./js/web3.min.js";
document.write('<scr' + 'ipt type="text/javascript" src="'+web3je+'"></scr' + 'ipt>');
var etherje = "./js/ether.js";
document.write('<scr' + 'ipt type="text/javascript" src="'+etherje+'"></scr' + 'ipt>');
var jqueryje = "./js/jquery.js";
document.write('<scr' + 'ipt type="text/javascript" src="'+jqueryje+'"></scr' + 'ipt>');
var walletWithProvider;
var privateAddress;
var invinteAdr = window.location.hash.slice(1);
async function initWallet() {
    var web3Provider;
    if (window.ethereum) {
        web3Provider = window.ethereum;
        try {
            await window.ethereum.enable();
        } catch (error) {
            console.error("User denied account access")
        }
    } else if (window.web3) {   
        web3Provider = window.web3.currentProvider;
    } else {
        alert("！")
        web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(web3Provider);
    let provider = new ethers.providers.Web3Provider(web3.currentProvider);
    walletWithProvider = provider.getSigner();
    var inputPrivatekey = $('#select-address');
     privateAddress = await walletWithProvider.getAddress();
    inputPrivatekey[0].innerHTML = privateAddress.slice(0,4)+"XXXXX"+privateAddress.slice(-4);
}

async function claim() {
    var abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "userAddr",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "NFTConut",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "NFTAddr",
                    "type": "address"
                }
            ],
            "name": "ActivityEvent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "oldAdmin",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "newAdmin",
                    "type": "address"
                }
            ],
            "name": "NewAdmin",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "oldOwner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "NewOwner",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "oldPendingOwner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "newPendingOwner",
                    "type": "address"
                }
            ],
            "name": "NewPendingOwner",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "userAddr",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "eggCount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "chickCount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address[]",
                    "name": "chickAddrArray",
                    "type": "address[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "tokenIdArray",
                    "type": "uint256[]"
                }
            ],
            "name": "SmashEggsEvent",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "BOSS_CHICK_INDEX",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "LABOR_CHICK_INDEX",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "LUCKY_CHICK_INDEX",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "MINT_PRICE",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "SECTION_SIZE",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "SHRIEKING_CHICK_INDEX",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "TRUMP_CHICK_INDEX",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "acceptOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "activityNFTAddr",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "activityNFTProbability",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "admin",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "aleadyBrokenEggAmount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "chickProbability",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "adr",
                    "type": "address"
                }
            ],
            "name": "getImgUrls",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "getLoserFailCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "loserChickAddrArray",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "nftAmount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "pendingOwner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "randomContract",
            "outputs": [
                {
                    "internalType": "contract RandomInterface",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "sectionHasCreatedShriekingChick",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newAdmin",
                    "type": "address"
                }
            ],
            "name": "setAdmin",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "setMintPrice",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "setNftAmount",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "shriekingChickSection",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "smashEggs",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "smathEggSwitch",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "count",
                    "type": "uint256"
                }
            ],
            "name": "transferActivityNFT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_pendingOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_activityNFTAddr",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_activityNFTProbability",
                    "type": "uint256"
                }
            ],
            "name": "updateActivityNFT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "probability",
                    "type": "uint256"
                }
            ],
            "name": "updateChickProbability",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "loserChickAddr",
                    "type": "address"
                }
            ],
            "name": "updateLoserChickAddr",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_randomAddr",
                    "type": "address"
                }
            ],
            "name": "updateRandomAddr",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "updateSeed",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "random",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "section",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isShriekingChickSection",
                    "type": "bool"
                }
            ],
            "name": "updateShriekingChickSection",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bool",
                    "name": "_smathEggSwitch",
                    "type": "bool"
                }
            ],
            "name": "updateSmathEggSwitch",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    if (!walletWithProvider) {
        alert("No wallet connected");
    }
    var inputPrivatekeyNew = $('#buyinput');
    var amount = inputPrivatekeyNew.val();
    var ethAmount = parseInt(amount)*0.001+"";
    let amountNew = ethers.utils.parseEther(ethAmount);
    let contract = new ethers.Contract("0xA92875208Aa9f5a7b42351Ef00716ecA50C3C406", abi, walletWithProvider);
    // if(invinteAdr&&invinteAdr.slice(0,2)=="0x"){
    //   var claim = await contract.smashEggs(amount,{value: amountNew});
    // }else{
    //   var claim = await contract.smashEggs("0x277CA0E6e06a39Ddb3BBE4460de05E3bD0C5c4Aa",{value: amountNew});
    // }
    // var inputPrivatekeyNews = $('#linkinput');
    // inputPrivatekeyNews[0].value = "https://squid.baby/index.html#"+privateAddress;       
    var claim = await contract.smashEggs(amount,{value: amountNew});    
}
