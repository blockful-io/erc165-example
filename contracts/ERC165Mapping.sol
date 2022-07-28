// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

abstract contract ERC165 is IERC165 {
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}
contract ERC165MappingImplementation  is ERC165 {
    /// @dev You must not set element 0xffffffff to true
    mapping(bytes4 => bool) internal supportedInterfaces;

    constructor() {
        supportedInterfaces[IERC165.supportsInterface.selector] = true;
    }

    function supportsInterface(bytes4 interfaceID) public view virtual override returns (bool) {
        return supportedInterfaces[interfaceID];
    }
}

interface Simpson {
    function is2D() external returns (bool);
    function skinColor() external returns (string memory);
}

contract Lisa is ERC165MappingImplementation, Simpson {
    constructor() {
        supportedInterfaces[Simpson.is2D.selector ^ Simpson.skinColor.selector] = true;
    }

    function is2D() external returns (bool){}
    function skinColor() external returns (string memory){}
}