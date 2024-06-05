# Configure the library to be tested
include_directories(${CMAKE_JS_INC})

file(GLOB 
    SOURCE_FILES 
    "encryption/*.cpp" 
    "encryption/*.hpp"
    "wrappers/*.cpp"
    "wrappers/*.hpp"
)

add_library(${PROJECT_NAME} 
    SHARED 
    ${SOURCE_FILES} 
    ${CMAKE_JS_SRC}
)

target_include_directories(${PROJECT_NAME}
    PUBLIC
    ${CMAKE_CURRENT_LIST_DIR}
)

set_target_properties(${PROJECT_NAME} 
    PROPERTIES 
    PREFIX "" 
    SUFFIX ".node"
)

target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})