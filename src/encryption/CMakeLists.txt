# Configure the library to be tested
add_library(encryption)

target_sources(encryption
  PRIVATE
  encoder.cpp
  decoder.cpp
  passwordManager.cpp
  )

target_include_directories(encryption
  PUBLIC
    ${CMAKE_CURRENT_LIST_DIR}
  )

set_target_properties(encryption PROPERTIES
  LINKER_LANGUAGE CXX
  CXX_STANDARD 17
)