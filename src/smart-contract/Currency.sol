// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";


contract Currency is ERC20, ERC20Burnable, ERC20Permit, AccessControl {
  //bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  constructor() ERC20("MIII LTD", "MIII") ERC20Permit("Stronger") {
    _mint(msg.sender, 1000000 * 10 ** decimals());
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    //_grantRole(MINTER_ROLE, msg.sender);
  }
  function mint() external{
    _mint(msg.sender, 1000 *  10 ** decimals());
  }

}