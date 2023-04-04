// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/utils/Address.sol';
import {MaxStableCoinAmountTooLow, MinStableCoinAmountTooHigh} from './Errors.sol';
import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

/**
 * @title An exchange for ChainGems tokens.
 * @notice This contract allows users to buy and sell ChainGems tokens using a stablecoin.
 */
contract ChainGemsExchange is ERC1155Holder {
    using SafeMath for uint256;
    using Address for address;
    using SafeERC20 for IERC20;

    IERC1155 public chainGems;
    uint256 public nativeTokenId;
    IERC20 public stableCoin;

    uint256 public constant FEE_DIVISOR = 1000; // 0.1% fee
    uint256 public constant FEE_RATE = 1;

    event TokenPurchase(
        address indexed buyer,
        uint256 indexed tokenId,
        uint256 amount,
        uint256 stableCoinAmount
    );
    event TokenSale(
        address indexed seller,
        uint256 indexed tokenId,
        uint256 amount,
        uint256 stableCoinAmount
    );

    /**
     * @dev Initializes the contract with the ChainGems contract, the native token ID, and the ERC20 stablecoin.
     * @param _chainGems Address of the ChainGems contract.
     * @param _nativeTokenId The ID of the native token in the ChainGems contract.
     * @param _stableCoin Address of the ERC20 stablecoin contract.
     */
    constructor(IERC1155 _chainGems, uint256 _nativeTokenId, IERC20 _stableCoin) {
        chainGems = _chainGems;
        nativeTokenId = _nativeTokenId;
        stableCoin = _stableCoin;
    }

    /**
     * @notice Buys ChainGems tokens using the stablecoin.
     * @dev Transfers stablecoin from the buyer to the contract, then transfers the requested tokens to the buyer.
     * @param tokenId The ID of the token to buy.
     * @param tokenAmount The amount of tokens to buy.
     * @param maxStableCoinAmount The maximum amount of stablecoin the buyer is willing to pay.
     */
    function buyTokens(uint256 tokenId, uint256 tokenAmount, uint256 maxStableCoinAmount) external {
        uint256 stableCoinAmount = getStableCoinAmountIn(tokenId, tokenAmount);
        if (stableCoinAmount > maxStableCoinAmount) revert MaxStableCoinAmountTooLow();

        stableCoin.safeTransferFrom(msg.sender, address(this), stableCoinAmount);
        chainGems.safeTransferFrom(address(this), msg.sender, tokenId, tokenAmount, '');

        emit TokenPurchase(msg.sender, tokenId, tokenAmount, stableCoinAmount);
    }

    /**
     * @notice Sells ChainGems tokens for the stablecoin.
     * @dev Transfers tokens from the seller to the contract, then transfers the stablecoin to the seller.
     * @param tokenId The ID of the token to sell.
     * @param tokenAmount The amount of tokens to sell.
     * @param minStableCoinAmount The minimum amount of stablecoin the seller is willing to accept.
     */
    function sellTokens(
        uint256 tokenId,
        uint256 tokenAmount,
        uint256 minStableCoinAmount
    ) external {
        uint256 stableCoinAmount = getStableCoinAmountOut(tokenId, tokenAmount);
        if (stableCoinAmount < minStableCoinAmount) revert MinStableCoinAmountTooHigh();

        chainGems.safeTransferFrom(msg.sender, address(this), tokenId, tokenAmount, '');
        stableCoin.safeTransfer(msg.sender, stableCoinAmount);

        emit TokenSale(msg.sender, tokenId, tokenAmount, stableCoinAmount);
    }

    /**
     * @notice Calculates the amount of stablecoin needed to buy the given amount of tokens.
     * @dev Uses the constant product formula to determine the required amount of stablecoin.
     * @param tokenId The ID of the token to buy.
     * @param tokenAmount The amount of tokens to buy.
     * @return The amount of stablecoin required.
     */
    function getStableCoinAmountIn(
        uint256 tokenId,
        uint256 tokenAmount
    ) public view returns (uint256) {
        uint256 tokenReserve = chainGems.balanceOf(address(this), tokenId);
        uint256 stableCoinReserve = stableCoin.balanceOf(address(this));

        return
            tokenAmount
                .mul(stableCoinReserve)
                .div(tokenReserve.add(tokenAmount))
                .mul(FEE_DIVISOR + FEE_RATE)
                .div(FEE_DIVISOR);
    }

    /**
     * @notice Calculates the amount of stablecoin to be received when selling the given amount of tokens.
     * @dev Uses the constant product formula to determine the amount of stablecoin to be received.
     * @param tokenId The ID of the token to sell.
     * @param tokenAmount The amount of tokens to sell.
     * @return The amount of stablecoin to be received.
     */
    function getStableCoinAmountOut(
        uint256 tokenId,
        uint256 tokenAmount
    ) public view returns (uint256) {
        uint256 tokenReserve = chainGems.balanceOf(address(this), tokenId);
        uint256 stableCoinReserve = stableCoin.balanceOf(address(this));

        return
            tokenAmount
                .mul(stableCoinReserve)
                .div(tokenReserve.add(tokenAmount))
                .mul(FEE_DIVISOR)
                .div(FEE_DIVISOR + FEE_RATE);
    }
}
