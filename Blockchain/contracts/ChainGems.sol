// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

/**
 * @title An ERC1155 contract for ChainGems tokens.
 * @notice This contract allow an owner to mint tokens and set the URI.
 * @dev Inherits from ERC1155 and Ownable contracts.
 */
contract ChainGems is ERC1155, Ownable {
    uint256 public constant NATIVE_TOKEN = 1;
    uint256 public constant B_ZERO1_RING = 2;
    uint256 public constant SERPENTI_VIPER_BRACELET = 3;
    string public constant baseURI =
        'https://bafybeihg4hycpp4itvsviu6flxf624dgaeyvnprnc4kx7akjzpb5iggxaa.ipfs.nftstorage.link/{id}.json';

    mapping(uint256 => string) private _uris;

    /**
     * @dev Constructor that mints initial tokens and sets the initial URI.
     */
    constructor() ERC1155(baseURI) {
        _mint(msg.sender, NATIVE_TOKEN, 10 ** 18, '');
        _mint(msg.sender, B_ZERO1_RING, 15, '');
        _mint(msg.sender, SERPENTI_VIPER_BRACELET, 15, '');
        setTokenURI(B_ZERO1_RING, baseURI);
        setTokenURI(SERPENTI_VIPER_BRACELET, baseURI);
    }

    /**
     * @notice Returns the URI for the given tokenId.
     * @param tokenId The token ID to query the URI of.
     * @return The URI for the given tokenId.
     */
    function getUri(uint256 tokenId) public view returns (string memory) {
        return (_uris[tokenId]);
    }

    /**
     * @notice Sets the URI for a given tokenId.
     * @dev Can only be called by the contract owner.
     * @param tokenId The token ID to set the URI for.
     * @param newuri The new URI for the given tokenId.
     */
    function setTokenURI(uint256 tokenId, string memory newuri) public onlyOwner {
        _uris[tokenId] = newuri;
    }

    /**
     * @notice Mints a new token.
     * @dev Can only be called by the contract owner.
     * @param account The account to mint the token for.
     * @param id The token ID to mint.
     * @param amount The amount of tokens to mint.
     * @param data Additional data with no specified format.
     */
    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        _mint(account, id, amount, data);
    }

    /**
     * @notice Mints a batch of new tokens.
     * @dev Can only be called by the contract owner.
     * @param to The account to mint the tokens for.
     * @param ids An array of token IDs to mint.
     * @param amounts An array of token amounts to mint.
     * @param data Additional data with no specified format.
     */
    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }
}
